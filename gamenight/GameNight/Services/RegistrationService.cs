using System.Data;
using GameNight.Data;
using GameNight.Models;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Services
{
    public enum RegistrationOutcome
    {
        Registered,
        EventNotFound,
        EventClosed,
        Duplicate,
        PreviouslyWithdrawn
    }

    public enum WithdrawalOutcome
    {
        Withdrawn,
        AlreadyWithdrawn,
        EventNotFound,
        EventClosed,
        InvalidCredentials
    }

    public record RegistrationResult(RegistrationOutcome Outcome, EventRegistration? Registration = null, string? RawCode = null);

    public record WithdrawalResult(WithdrawalOutcome Outcome, bool PromotedFromWaitlist = false);

    /// <summary>
    /// Jelentkezés és visszavonás. Az eseményt módosító írások eseményenként sorosítva futnak:
    /// egy adatbázis-tranzakcióban először az eseménysort zároljuk (SELECT ... FOR UPDATE),
    /// és csak utána olvassuk a kapcsolódó adatokat.
    /// </summary>
    public class RegistrationService
    {
        private readonly GameNightDbContext _db;
        private readonly TimeProvider _time;

        public RegistrationService(GameNightDbContext db, TimeProvider time)
        {
            _db = db;
            _time = time;
        }

        /// <summary>Szélső szóközök eltávolítása és kultúrafüggetlen kisbetűsítés.</summary>
        public static string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();

        /// <summary>Jelentkezni és visszavonni csak jövőbeli Planned eseménynél lehet.</summary>
        public static bool IsOpen(GameEvent ev, DateTime utcNow) =>
            ev.Status == EventStatus.Planned && ev.StartsAtUtc > utcNow;

        private DateTime UtcNow => _time.GetUtcNow().UtcDateTime;

        /// <summary>Az eseménysor zárolása. A zár a tranzakció végéig tart.</summary>
        private async Task LockEventAsync(int eventId, CancellationToken ct)
        {
            // Más szolgáltatónál (pl. SQLite a tesztekben) a tranzakció maga sorosít.
            if (_db.Database.IsMySql())
            {
                await _db.Database.ExecuteSqlInterpolatedAsync(
                    $"SELECT Id FROM GameEvents WHERE Id = {eventId} FOR UPDATE", ct);
            }
        }

        public async Task<RegistrationResult> RegisterAsync(int eventId, string displayName, string email,
            CancellationToken ct = default)
        {
            var name = displayName.Trim();
            var cleanEmail = email.Trim();
            var normalized = NormalizeEmail(cleanEmail);

            await using var tx = await _db.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted, ct);

            await LockEventAsync(eventId, ct);
            var ev = await _db.GameEvents.FirstOrDefaultAsync(e => e.Id == eventId, ct);
            if (ev == null) return new RegistrationResult(RegistrationOutcome.EventNotFound);

            // Az állapotot és az időpontot a zár megszerzése után ellenőrizzük.
            if (!IsOpen(ev, UtcNow)) return new RegistrationResult(RegistrationOutcome.EventClosed);

            var existing = await _db.EventRegistrations
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.GameEventId == eventId && r.NormalizedEmail == normalized, ct);
            if (existing != null)
            {
                return new RegistrationResult(existing.Status == RegistrationStatus.Withdrawn
                    ? RegistrationOutcome.PreviouslyWithdrawn
                    : RegistrationOutcome.Duplicate);
            }

            var confirmed = await _db.EventRegistrations
                .CountAsync(r => r.GameEventId == eventId && r.Status == RegistrationStatus.Confirmed, ct);

            var rawCode = WithdrawalCodes.Generate();
            var registration = new EventRegistration
            {
                GameEventId = eventId,
                DisplayName = name,
                Email = cleanEmail,
                NormalizedEmail = normalized,
                CreatedAtUtc = UtcNow,
                Status = confirmed < ev.Capacity ? RegistrationStatus.Confirmed : RegistrationStatus.Waitlisted,
                WithdrawalCodeHash = WithdrawalCodes.Hash(rawCode)
            };
            _db.EventRegistrations.Add(registration);

            try
            {
                await _db.SaveChangesAsync(ct);
                await tx.CommitAsync(ct);
            }
            catch (DbUpdateException)
            {
                // Az egyedi index az utolsó védvonal: kezelhető üzleti hibává alakítjuk.
                _db.Entry(registration).State = EntityState.Detached;
                await tx.RollbackAsync(ct);
                return new RegistrationResult(RegistrationOutcome.Duplicate);
            }

            return new RegistrationResult(RegistrationOutcome.Registered, registration, rawCode);
        }

        public async Task<WithdrawalResult> WithdrawAsync(int eventId, string email, string code,
            CancellationToken ct = default)
        {
            var normalized = NormalizeEmail(email);

            await using var tx = await _db.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted, ct);

            await LockEventAsync(eventId, ct);
            var ev = await _db.GameEvents.FirstOrDefaultAsync(e => e.Id == eventId, ct);
            if (ev == null) return new WithdrawalResult(WithdrawalOutcome.EventNotFound);

            var registration = await _db.EventRegistrations
                .FirstOrDefaultAsync(r => r.GameEventId == eventId && r.NormalizedEmail == normalized, ct);

            // Hiányzó jelentkezés, kód nélküli (régi) résztvevő és hibás kód ugyanazt a választ kapja.
            if (registration == null || !WithdrawalCodes.Verify(code, registration.WithdrawalCodeHash))
                return new WithdrawalResult(WithdrawalOutcome.InvalidCredentials);

            if (!IsOpen(ev, UtcNow)) return new WithdrawalResult(WithdrawalOutcome.EventClosed);

            if (registration.Status == RegistrationStatus.Withdrawn)
                return new WithdrawalResult(WithdrawalOutcome.AlreadyWithdrawn);

            var wasConfirmed = registration.Status == RegistrationStatus.Confirmed;
            registration.Status = RegistrationStatus.Withdrawn;
            await _db.SaveChangesAsync(ct);

            var promoted = false;
            // Waitlisted visszavonása nem okoz előreléptetést; Confirmed esetén az első várólistás lép elő.
            if (wasConfirmed)
            {
                var confirmed = await _db.EventRegistrations
                    .CountAsync(r => r.GameEventId == eventId && r.Status == RegistrationStatus.Confirmed, ct);
                if (confirmed < ev.Capacity)
                {
                    var next = await _db.EventRegistrations
                        .Where(r => r.GameEventId == eventId && r.Status == RegistrationStatus.Waitlisted)
                        .OrderBy(r => r.CreatedAtUtc).ThenBy(r => r.Id)
                        .FirstOrDefaultAsync(ct);
                    if (next != null)
                    {
                        next.Status = RegistrationStatus.Confirmed;
                        await _db.SaveChangesAsync(ct);
                        promoted = true;
                    }
                }
            }

            await tx.CommitAsync(ct);
            return new WithdrawalResult(WithdrawalOutcome.Withdrawn, promoted);
        }
    }
}

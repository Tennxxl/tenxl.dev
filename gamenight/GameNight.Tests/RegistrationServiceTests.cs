using GameNight.Models;
using GameNight.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace GameNight.Tests;

public class RegistrationServiceTests
{
    private static RegistrationService Service(TestDb t) => new(t.NewContext(), t.Time);

    [Fact]
    public async Task Fills_capacity_then_waitlists_and_normalizes_email()
    {
        using var t = new TestDb();
        var id = t.AddEvent(capacity: 2);

        var a = await Service(t).RegisterAsync(id, "Anna", "  Anna@Example.COM ");
        var b = await Service(t).RegisterAsync(id, "Béla", "bela@example.com");
        var c = await Service(t).RegisterAsync(id, "Cili", "cili@example.com");

        Assert.Equal(RegistrationStatus.Confirmed, a.Registration!.Status);
        Assert.Equal("anna@example.com", a.Registration.NormalizedEmail);
        Assert.Equal(RegistrationStatus.Confirmed, b.Registration!.Status);
        Assert.Equal(RegistrationStatus.Waitlisted, c.Registration!.Status);
    }

    [Fact]
    public async Task Duplicate_email_is_a_business_error_and_not_stored()
    {
        using var t = new TestDb();
        var id = t.AddEvent(2);
        await Service(t).RegisterAsync(id, "Anna", "anna@example.com");

        var again = await Service(t).RegisterAsync(id, "Anna 2", " ANNA@example.com");

        Assert.Equal(RegistrationOutcome.Duplicate, again.Outcome);
        Assert.Equal(1, await t.NewContext().EventRegistrations.CountAsync());
    }

    [Fact]
    public async Task Only_future_planned_events_accept_registration()
    {
        using var t = new TestDb();
        var cancelled = t.AddEvent(5, EventStatus.Cancelled);
        Assert.Equal(RegistrationOutcome.EventClosed, (await Service(t).RegisterAsync(cancelled, "A", "a@x.hu")).Outcome);

        t.Time.Now = t.Time.Now.AddDays(30); // az esemény már a múltban van
        Assert.Equal(RegistrationOutcome.EventClosed, (await Service(t).RegisterAsync(cancelled, "A", "a@x.hu")).Outcome);
        Assert.Equal(RegistrationOutcome.EventNotFound, (await Service(t).RegisterAsync(999, "A", "a@x.hu")).Outcome);
    }

    [Fact]
    public async Task Raw_code_is_returned_once_and_only_its_hash_is_stored()
    {
        using var t = new TestDb();
        var id = t.AddEvent(2);

        var r = await Service(t).RegisterAsync(id, "Anna", "anna@example.com");

        Assert.NotNull(r.RawCode);
        var stored = await t.NewContext().EventRegistrations.SingleAsync();
        Assert.NotEqual(r.RawCode, stored.WithdrawalCodeHash);
        Assert.DoesNotContain(WithdrawalCodes.Normalize(r.RawCode), stored.WithdrawalCodeHash!);
        Assert.True(WithdrawalCodes.Verify(r.RawCode, stored.WithdrawalCodeHash));
    }

    [Fact]
    public async Task Withdraw_with_wrong_code_or_email_changes_nothing()
    {
        using var t = new TestDb();
        var id = t.AddEvent(2);
        var r = await Service(t).RegisterAsync(id, "Anna", "anna@example.com");

        Assert.Equal(WithdrawalOutcome.InvalidCredentials, (await Service(t).WithdrawAsync(id, "anna@example.com", "0000-1111")).Outcome);
        Assert.Equal(WithdrawalOutcome.InvalidCredentials, (await Service(t).WithdrawAsync(id, "other@example.com", r.RawCode!)).Outcome);
        Assert.Equal(RegistrationStatus.Confirmed, (await t.NewContext().EventRegistrations.SingleAsync()).Status);
    }

    [Fact]
    public async Task Withdrawing_confirmed_promotes_first_waitlisted_by_created_then_id()
    {
        using var t = new TestDb();
        var id = t.AddEvent(1);
        var first = await Service(t).RegisterAsync(id, "Anna", "anna@example.com");
        t.Time.Now = t.Time.Now.AddMinutes(1);
        await Service(t).RegisterAsync(id, "Béla", "bela@example.com");
        t.Time.Now = t.Time.Now.AddMinutes(1);
        await Service(t).RegisterAsync(id, "Cili", "cili@example.com");

        var w = await Service(t).WithdrawAsync(id, "ANNA@example.com", first.RawCode!);

        Assert.Equal(WithdrawalOutcome.Withdrawn, w.Outcome);
        Assert.True(w.PromotedFromWaitlist);
        var all = await t.NewContext().EventRegistrations.OrderBy(r => r.Id).ToListAsync();
        Assert.Equal(new[] { RegistrationStatus.Withdrawn, RegistrationStatus.Confirmed, RegistrationStatus.Waitlisted },
            all.Select(r => r.Status).ToArray());
    }

    [Fact]
    public async Task Withdrawing_waitlisted_does_not_promote_anyone()
    {
        using var t = new TestDb();
        var id = t.AddEvent(1);
        await Service(t).RegisterAsync(id, "Anna", "anna@example.com");
        var b = await Service(t).RegisterAsync(id, "Béla", "bela@example.com");
        await Service(t).RegisterAsync(id, "Cili", "cili@example.com");

        var w = await Service(t).WithdrawAsync(id, "bela@example.com", b.RawCode!);

        Assert.False(w.PromotedFromWaitlist);
        var all = await t.NewContext().EventRegistrations.OrderBy(r => r.Id).ToListAsync();
        Assert.Equal(new[] { RegistrationStatus.Confirmed, RegistrationStatus.Withdrawn, RegistrationStatus.Waitlisted },
            all.Select(r => r.Status).ToArray());
    }

    [Fact]
    public async Task Withdrawn_email_cannot_register_again_and_second_withdrawal_is_idempotent()
    {
        using var t = new TestDb();
        var id = t.AddEvent(2);
        var r = await Service(t).RegisterAsync(id, "Anna", "anna@example.com");
        await Service(t).WithdrawAsync(id, "anna@example.com", r.RawCode!);

        Assert.Equal(RegistrationOutcome.PreviouslyWithdrawn, (await Service(t).RegisterAsync(id, "Anna", "anna@example.com")).Outcome);
        Assert.Equal(WithdrawalOutcome.AlreadyWithdrawn, (await Service(t).WithdrawAsync(id, "anna@example.com", r.RawCode!)).Outcome);
    }

    [Fact]
    public async Task Withdrawal_is_refused_for_cancelled_or_past_events_and_for_registrations_without_code()
    {
        using var t = new TestDb();
        var id = t.AddEvent(3);
        var r = await Service(t).RegisterAsync(id, "Anna", "anna@example.com");

        // Korábbi résztvevő kód nélkül: nincs önkiszolgáló visszavonás.
        await using (var db = t.NewContext())
        {
            db.EventRegistrations.Add(new EventRegistration
            {
                GameEventId = id, DisplayName = "Régi", Email = "regi@example.com", NormalizedEmail = "regi@example.com",
                CreatedAtUtc = t.Time.Now.UtcDateTime, Status = RegistrationStatus.Confirmed
            });
            await db.SaveChangesAsync();
        }
        Assert.Equal(WithdrawalOutcome.InvalidCredentials, (await Service(t).WithdrawAsync(id, "regi@example.com", "AAAA")).Outcome);

        t.Time.Now = t.Time.Now.AddDays(30);
        Assert.Equal(WithdrawalOutcome.EventClosed, (await Service(t).WithdrawAsync(id, "anna@example.com", r.RawCode!)).Outcome);
    }
}

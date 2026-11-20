using System.ComponentModel.DataAnnotations;

namespace GameNight.Models
{
    public enum RegistrationStatus
    {
        Confirmed,
        Waitlisted,
        Withdrawn
    }

    public class EventRegistration
    {
        public int Id { get; set; }

        public int GameEventId { get; set; }
        public GameEvent? GameEvent { get; set; }

        [MaxLength(80)]
        public string DisplayName { get; set; } = string.Empty;

        [MaxLength(254)]
        public string Email { get; set; } = string.Empty;

        /// <summary>Szélső szóközöktől megtisztított, kultúrafüggetlenül kisbetűsített e-mail.</summary>
        [MaxLength(254)]
        public string NormalizedEmail { get; set; } = string.Empty;

        public DateTime CreatedAtUtc { get; set; }

        public RegistrationStatus Status { get; set; }

        /// <summary>A kezelőkód SHA-256 kivonata (hexa). A nyers kódot nem tároljuk.
        /// A korábbi résztvevőknél null: nekik nincs önkiszolgáló visszavonás.</summary>
        [MaxLength(64)]
        public string? WithdrawalCodeHash { get; set; }
    }
}

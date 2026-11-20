using System.ComponentModel.DataAnnotations;

namespace GameNight.Models
{
    public enum EventStatus
    {
        Planned,
        Cancelled
    }

    /// <summary>Játékest. Az időpont UTC-ben tárolt.</summary>
    public class GameEvent
    {
        public int Id { get; set; }

        [MaxLength(80)]
        public string Title { get; set; } = string.Empty;

        public DateTime StartsAtUtc { get; set; }

        [MaxLength(100)]
        public string Location { get; set; } = string.Empty;

        public int Capacity { get; set; }

        public EventStatus Status { get; set; } = EventStatus.Planned;

        public int GameSuggestionId { get; set; }
        public GameSuggestion? GameSuggestion { get; set; }

        public List<EventRegistration> Registrations { get; set; } = new();
    }
}

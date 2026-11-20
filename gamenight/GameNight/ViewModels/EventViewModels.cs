using GameNight.Models;

namespace GameNight.ViewModels
{
    public class EventListItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string GameTitle { get; set; } = "";
        public DateTime StartsAtUtc { get; set; }
        public string Location { get; set; } = "";
        public int Capacity { get; set; }
        public EventStatus Status { get; set; }
    }

    public class EventListViewModel
    {
        public List<EventListItem> Items { get; set; } = new();
        public bool ShowAll { get; set; }
    }

    public class EventDetailsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public int GameSuggestionId { get; set; }
        public string GameTitle { get; set; } = "";
        public DateTime StartsAtUtc { get; set; }
        public string Location { get; set; } = "";
        public int Capacity { get; set; }
        public EventStatus Status { get; set; }

        public int ConfirmedCount { get; set; }
        public int WaitlistedCount { get; set; }
        public int FreeSeats => Math.Max(0, Capacity - ConfirmedCount);

        /// <summary>Jövőbeli Planned esemény: lehet jelentkezni, visszavonni és szerkeszteni.</summary>
        public bool IsOpen { get; set; }

        public RegistrationInputModel Register { get; set; } = new();
        public WithdrawalInputModel Withdraw { get; set; } = new();

        /// <summary>Csak közvetlenül a sikeres jelentkezés után kitöltött értékek.</summary>
        public string? NewRegistrationStatus { get; set; }
        public string? NewWithdrawalCode { get; set; }
    }
}

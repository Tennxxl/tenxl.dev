using System.ComponentModel.DataAnnotations;

namespace GameNight.Models
{
    /// <summary>Egy játékajánlás (katalóguselem). Az űrlapok külön űrlapmodellt használnak.</summary>
    public class GameSuggestion
    {
        public int Id { get; set; }

        [MaxLength(30)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string GameTitle { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Genre { get; set; } = string.Empty;

        public int PlayerCount { get; set; }

        public bool HasGame { get; set; } // Rendelkezésre áll.
        public int? Rating { get; set; }

        [MaxLength(40)]
        public string? Platform { get; set; }

        /// <summary>Archivált ajánlás: a normál katalógusból kimarad.</summary>
        public bool IsArchived { get; set; }

        public List<GameEvent> Events { get; set; } = new();
    }
}

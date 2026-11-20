using GameNight.Models;

namespace GameNight.ViewModels
{
    public record GenreCount(string Genre, int Count);

    /// <summary>A katalóguslista nézetmodellje: szűrők, rendezés, lapozás.</summary>
    public class CatalogViewModel
    {
        public const int PageSize = 5;

        public List<GameSuggestion> Items { get; set; } = new();

        // Az érvényes (tényleges) szűrőértékek – ezekből épülnek a lapozó- és rendezőlinkek.
        public string? Search { get; set; }
        public string? Genre { get; set; }
        public int? MinPlayers { get; set; }
        public string Available { get; set; } = "all";
        public string Sort { get; set; } = "title_asc";

        /// <summary>A beírt (nyers) minPlayers érték, hogy hiba esetén is látszódjon az űrlapon.</summary>
        public string? MinPlayersRaw { get; set; }

        public int Page { get; set; } = 1;
        public int TotalPages { get; set; } = 1;
        public int TotalCount { get; set; }
        public int ActiveCount { get; set; }

        public List<string> Genres { get; set; } = new();
        public List<GenreCount> ByGenre { get; set; } = new();

        /// <summary>A lapozó- és rendezőlinkek útvonal-értékei: csak a ténylegesen megadott szűrők.</summary>
        public Dictionary<string, string> RouteValues(int? page = null)
        {
            var values = new Dictionary<string, string>();
            if (!string.IsNullOrEmpty(Search)) values["search"] = Search;
            if (!string.IsNullOrEmpty(Genre)) values["genre"] = Genre;
            if (MinPlayers.HasValue) values["minPlayers"] = MinPlayers.Value.ToString();
            if (Available != "all") values["available"] = Available;
            if (Sort != "title_asc") values["sort"] = Sort;
            if (page.HasValue && page.Value > 1) values["page"] = page.Value.ToString();
            return values;
        }

        public bool HasFilter => !string.IsNullOrEmpty(Search) || !string.IsNullOrEmpty(Genre)
                                 || MinPlayers.HasValue || Available != "all";
    }

    public class SuggestionDetailsViewModel
    {
        public GameSuggestion Suggestion { get; set; } = null!;
        public string BackUrl { get; set; } = "/";
        public string? ReturnUrl { get; set; }
    }

    public class HomeIndexViewModel
    {
        public int SuggestionsCount { get; set; }
        public int HasGameCount { get; set; }
        public string? TopGameTitle { get; set; }
        public int TopGameCount { get; set; }
    }
}

using GameNight.Models;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Data
{
    /// <summary>Ismételt indításkor nem duplikálódó kezdőadatok. Az időpontok a mai naphoz viszonyítottak.</summary>
    public static class SeedData
    {
        public static void Seed(GameNightDbContext db, TimeProvider time)
        {
            if (!db.GameSuggestions.Any())
            {
                db.GameSuggestions.AddRange(
                    S("Anna", "Minecraft", "Sandbox", 8, true, "PC", 5),
                    S("Bence", "Catan", "Strategy", 4, true, null, 4),
                    S("Dávid", "Minecraft", "Sandbox", 8, false, "PC", null),
                    S("Eszter", "Dixit", "Party", 6, true, null, 5),
                    S("Gergő", "Codenames", "Party", 8, false, null, 3),
                    S("Réka", "Carcassonne", "Strategy", 5, true, null, 4),
                    S("Máté", "Mario Kart 8", "Racing", 4, true, "Switch", 5),
                    S("Lilla", "Uno", "Card", 10, true, null, null),
                    S("Ádám", "Ticket to Ride", "Strategy", 5, false, null, 4),
                    S("Nóra", "Jackbox Party Pack", "Party", 8, true, "PC", 4),
                    S("Bálint", "Régi játék", "Retro", 2, false, "Egyéb", 2, archived: true));
                db.SaveChanges();
            }

            if (!db.GameEvents.Any())
            {
                var now = time.GetUtcNow().UtcDateTime;
                var games = db.GameSuggestions.Where(s => !s.IsArchived && s.HasGame)
                    .OrderBy(s => s.Id).Take(3).ToList();
                if (games.Count == 3)
                {
                    db.GameEvents.AddRange(
                        E("Társasjáték-est", now.AddDays(3), "Klubterem", 8, games[0]),
                        E("Stratégiai csata", now.AddDays(10), "Közösségi ház", 5, games[1]),
                        E("Party-est", now.AddDays(30), "Kávézó", 12, games[2]),
                        E("Lezajlott est", now.AddDays(-7), "Klubterem", 6, games[0]));
                    db.SaveChanges();
                }
            }
        }

        private static GameSuggestion S(string name, string title, string genre, int players, bool hasGame,
            string? platform, int? rating, bool archived = false) => new()
        {
            Name = name, GameTitle = title, Genre = genre, PlayerCount = players, HasGame = hasGame,
            Platform = platform, Rating = rating, IsArchived = archived
        };

        private static GameEvent E(string title, DateTime startsAtUtc, string location, int capacity, GameSuggestion game) => new()
        {
            Title = title,
            // Percre kerekítve, UTC-ben tárolva.
            StartsAtUtc = new DateTime(startsAtUtc.Year, startsAtUtc.Month, startsAtUtc.Day, startsAtUtc.Hour, 0, 0, DateTimeKind.Utc),
            Location = location,
            Capacity = capacity,
            Status = EventStatus.Planned,
            GameSuggestionId = game.Id
        };
    }
}

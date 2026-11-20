using GameNight.Data;
using GameNight.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Tests;

public class FakeTimeProvider : TimeProvider
{
    public DateTimeOffset Now { get; set; } = new(2030, 1, 10, 12, 0, 0, TimeSpan.Zero);
    public override DateTimeOffset GetUtcNow() => Now;
}

/// <summary>Memóriabeli SQLite adatbázis a szolgáltatás-tesztekhez.</summary>
public sealed class TestDb : IDisposable
{
    private readonly SqliteConnection _connection = new("DataSource=:memory:");
    public FakeTimeProvider Time { get; } = new();

    public TestDb()
    {
        _connection.Open();
        using var db = NewContext();
        db.Database.EnsureCreated();
    }

    public GameNightDbContext NewContext() =>
        new(new DbContextOptionsBuilder<GameNightDbContext>().UseSqlite(_connection).Options);

    public int AddEvent(int capacity, EventStatus status = EventStatus.Planned, int daysFromNow = 5)
    {
        using var db = NewContext();
        var game = new GameSuggestion { Name = "T", GameTitle = "Catan", Genre = "Strategy", PlayerCount = 4, HasGame = true };
        db.GameSuggestions.Add(game);
        db.GameEvents.Add(new GameEvent
        {
            Title = "Est", Location = "Terem", Capacity = capacity, Status = status,
            StartsAtUtc = Time.Now.UtcDateTime.AddDays(daysFromNow), GameSuggestion = game
        });
        db.SaveChanges();
        return db.GameEvents.Single().Id;
    }

    public void Dispose() => _connection.Dispose();
}

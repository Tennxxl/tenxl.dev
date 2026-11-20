using GameNight.Models;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Data
{
    public class GameNightDbContext : DbContext
    {
        public GameNightDbContext(DbContextOptions<GameNightDbContext> options) : base(options) { }

        public DbSet<GameSuggestion> GameSuggestions => Set<GameSuggestion>();
        public DbSet<GameEvent> GameEvents => Set<GameEvent>();
        public DbSet<EventRegistration> EventRegistrations => Set<EventRegistration>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GameSuggestion>(e =>
            {
                e.Property(x => x.IsArchived).HasDefaultValue(false);
                e.HasIndex(x => new { x.IsArchived, x.HasGame });
            });

            modelBuilder.Entity<GameEvent>(e =>
            {
                // UTC-ben tárolt időpont: olvasáskor Kind=Utc legyen.
                e.Property(x => x.StartsAtUtc).HasConversion(
                    v => v,
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
                e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
                e.HasOne(x => x.GameSuggestion)
                    .WithMany(s => s.Events)
                    .HasForeignKey(x => x.GameSuggestionId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict);
                e.HasIndex(x => new { x.StartsAtUtc, x.Id });
            });

            modelBuilder.Entity<EventRegistration>(e =>
            {
                e.Property(x => x.CreatedAtUtc).HasConversion(
                    v => v,
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
                e.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
                e.HasOne(x => x.GameEvent)
                    .WithMany(g => g.Registrations)
                    .HasForeignKey(x => x.GameEventId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict);
                // Bináris rendezés: az e-mail-összehasonlítás pontos (kis- és nagybetű-, ékezetérzékeny),
                // a kisbetűsítést a NormalizedEmail előállítása végzi.
                if (Database.IsMySql())
                {
                    e.Property(x => x.NormalizedEmail).UseCollation("utf8mb4_bin");
                }
                e.HasIndex(x => new { x.GameEventId, x.NormalizedEmail }).IsUnique();
            });
        }
    }
}

namespace GameNight.Models
{
    /// <summary>A választható platformok (a szerver is ezt ellenőrzi).</summary>
    public static class Platforms
    {
        public static readonly IReadOnlyList<string> All = new[] { "PC", "PlayStation", "Xbox", "Switch", "Egyéb" };

        public static bool IsAllowed(string? value) => value != null && All.Contains(value, StringComparer.Ordinal);
    }
}

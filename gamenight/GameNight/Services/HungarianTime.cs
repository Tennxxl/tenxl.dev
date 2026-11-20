using System.Globalization;

namespace GameNight.Services
{
    /// <summary>Az időpontok UTC-ben tárolódnak, a felületen magyar (budapesti) helyi időben jelennek meg.</summary>
    public static class HungarianTime
    {
        private static readonly string[] InputFormats = { "yyyy-MM-dd'T'HH:mm", "yyyy-MM-dd'T'HH:mm:ss" };

        public static readonly TimeZoneInfo Zone = FindZone();

        private static TimeZoneInfo FindZone()
        {
            foreach (var id in new[] { "Europe/Budapest", "Central European Standard Time" })
            {
                try { return TimeZoneInfo.FindSystemTimeZoneById(id); }
                catch (TimeZoneNotFoundException) { }
                catch (InvalidTimeZoneException) { }
            }
            throw new InvalidOperationException("A budapesti időzóna nem található a rendszeren.");
        }

        public static DateTime ToLocal(DateTime utc) =>
            TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(utc, DateTimeKind.Utc), Zone);

        public static string Format(DateTime utc) =>
            ToLocal(utc).ToString("yyyy. MM. dd. HH:mm", CultureInfo.InvariantCulture);

        /// <summary>A datetime-local mező értéke (budapesti helyi idő).</summary>
        public static string ToInputValue(DateTime utc) =>
            ToLocal(utc).ToString("yyyy-MM-dd'T'HH:mm", CultureInfo.InvariantCulture);

        /// <summary>
        /// Budapesti helyi időből UTC. Hibát ad érvénytelen formátumra, a nyári időszámítás miatt
        /// nem létező (tavaszi átállás) és kétértelmű (őszi átállás) időpontra.
        /// </summary>
        public static bool TryParseLocal(string? input, out DateTime utc, out string? error)
        {
            utc = default;
            error = null;

            if (!DateTime.TryParseExact(input?.Trim(), InputFormats, CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out var local))
            {
                error = "A kezdés időpontja érvénytelen. Használd az ÉÉÉÉ-HH-NN óó:pp formátumot.";
                return false;
            }

            local = DateTime.SpecifyKind(local, DateTimeKind.Unspecified);

            if (Zone.IsInvalidTime(local))
            {
                error = "Ez a helyi időpont nem létezik a nyári időszámítás átállása miatt. Válassz másik időpontot.";
                return false;
            }

            if (Zone.IsAmbiguousTime(local))
            {
                error = "Ez a helyi időpont kétértelmű a nyári időszámítás átállása miatt. Válassz másik időpontot.";
                return false;
            }

            utc = TimeZoneInfo.ConvertTimeToUtc(local, Zone);
            return true;
        }
    }
}

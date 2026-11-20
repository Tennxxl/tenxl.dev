using System.Security.Cryptography;
using System.Text;

namespace GameNight.Services
{
    /// <summary>
    /// A jelentkezés visszavonásához használt kezelőkód. A nyers kódot csak a jelentkezés
    /// után közvetlenül mutatjuk meg; az adatbázisban kizárólag a SHA-256 kivonata van.
    /// </summary>
    public static class WithdrawalCodes
    {
        /// <summary>128 bites, kriptográfiailag véletlen kód, 4 karakteres csoportokban (pl. 1A2B-3C4D-...).</summary>
        public static string Generate()
        {
            var hex = Convert.ToHexString(RandomNumberGenerator.GetBytes(16));
            return string.Join('-', Enumerable.Range(0, 8).Select(i => hex.Substring(i * 4, 4)));
        }

        /// <summary>Elhagyja a kötőjeleket és szóközöket, nagybetűsít: így a beírt kód tűrőbb.</summary>
        public static string Normalize(string? code) =>
            new string((code ?? "").Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();

        public static string Hash(string? code) =>
            Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(Normalize(code))));

        /// <summary>Időállandó összehasonlítás a tárolt kivonattal.</summary>
        public static bool Verify(string? code, string? storedHash)
        {
            if (string.IsNullOrEmpty(storedHash) || string.IsNullOrWhiteSpace(code)) return false;
            var actual = Encoding.ASCII.GetBytes(Hash(code));
            var expected = Encoding.ASCII.GetBytes(storedHash.ToUpperInvariant());
            return actual.Length == expected.Length && CryptographicOperations.FixedTimeEquals(actual, expected);
        }
    }
}

# GameNight

ASP.NET Core MVC (.NET 9) + Entity Framework Core + MySQL alkalmazás játékajánlásokhoz (katalógus)
és játékestek szervezéséhez (jelentkezés, várólista, visszavonás).

## Futtatás

1. Hozz létre egy saját, helyi MySQL/MariaDB adatbázist és felhasználót (minden fejlesztő külön adatbázissal dolgozik).
2. Add meg a kapcsolatot, lehetőleg user-secrets használatával (ne kerüljön a repóba):

   ```bash
   cd GameNight
   dotnet user-secrets init
   dotnet user-secrets set "ConnectionStrings:GameNight" "Server=localhost;Port=3306;Database=gamenight;User=...;Password=..."
   # MariaDB esetén: dotnet user-secrets set "Database:ServerVersion" "10.11.0-mariadb"
   ```

3. `dotnet run` – induláskor a migrációk lefutnak, és a kezdőadatok betöltődnek (csak üres táblákba, így
   ismételt indításkor nem duplikálódnak; az események időpontjai a mai naphoz viszonyítottak).

Új migráció: `dotnet ef migrations add <Név> -n GameNight.Migrations -o Migrations` (a `GameNight` mappában).

## Tesztek

```bash
dotnet test
```

A szolgáltatás-tesztek memóriabeli SQLite-ot használnak; a jelentkezés/várólista logika MySQL-en az eseménysor
zárolásával (`SELECT ... FOR UPDATE`) sorosított.

## Működés röviden

- **Katalógus** (`/Home/ListSuggestions`): keresés (cím, műfaj), műfaj, minimális játékosszám, elérhetőség,
  rendezés, lapozás (5/oldal) – mind az adatbázisban. Archivált ajánlások csak az archívumban láthatók.
- **Ajánlás**: adatlap (404 hiányzó rekordra, csak helyi `returnUrl`), szerkesztés (archivált: 409), archiválás/visszaállítás (POST).
- **Játékestek** (`/Events`): időpont UTC-ben tárolva, budapesti helyi időben megjelenítve; a nyári időszámítás
  miatt nem létező vagy kétértelmű időpont hibát ad.
- **Jelentkezés**: kapacitásig `Confirmed`, utána `Waitlisted`; e-mailenként egyszer; visszavonás után nincs új jelentkezés.
- **Visszavonás**: a jelentkezés után egyszer megjelenő kezelőkóddal (az adatbázisban csak SHA-256 kivonat);
  `Confirmed` visszavonásakor az első várólistás lép elő.

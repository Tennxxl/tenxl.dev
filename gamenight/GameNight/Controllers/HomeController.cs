using System.Diagnostics;
using System.Globalization;
using System.Numerics;
using GameNight.Data;
using GameNight.Models;
using GameNight.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Controllers;

public class HomeController : Controller
{
    private readonly GameNightDbContext _db;
    private readonly ILogger<HomeController> _logger;

    public HomeController(GameNightDbContext db, ILogger<HomeController> logger)
    {
        _db = db;
        _logger = logger;
    }

    private IQueryable<GameSuggestion> Active => _db.GameSuggestions.AsNoTracking().Where(s => !s.IsArchived);

    public async Task<IActionResult> Index()
    {
        var topGame = await Active
            .GroupBy(s => s.GameTitle)
            .Select(g => new { GameTitle = g.Key, Count = g.Count() })
            .OrderByDescending(g => g.Count).ThenBy(g => g.GameTitle)
            .FirstOrDefaultAsync();

        var model = new HomeIndexViewModel
        {
            SuggestionsCount = await Active.CountAsync(),
            HasGameCount = await Active.CountAsync(s => s.HasGame),
            TopGameTitle = topGame?.GameTitle,
            TopGameCount = topGame?.Count ?? 0
        };
        return View(model);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    // GET: /Home/HttpStatus?code=404 – a hiányzó rekord és az ütközés érthető oldala
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult HttpStatus(int code)
    {
        ViewData["Code"] = code;
        ViewData["Message"] = code switch
        {
            404 => "A keresett oldal vagy rekord nem található.",
            409 => "A kért művelet az érintett elem jelenlegi állapotában nem hajtható végre.",
            _ => "A kérés nem teljesíthető."
        };
        Response.StatusCode = code;
        return View("HttpStatus");
    }

    // GET: /Home/SuggestGame
    [HttpGet]
    public ViewResult SuggestGame()
    {
        return View(new SuggestionCreateModel());
    }

    // POST: /Home/SuggestGame
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SuggestGame(SuggestionCreateModel form)
    {
        if (!ModelState.IsValid)
        {
            return View(form);
        }

        var suggestion = new GameSuggestion
        {
            Name = form.Name!,
            GameTitle = form.GameTitle!,
            Genre = form.Genre!,
            PlayerCount = form.PlayerCount!.Value,
            HasGame = form.HasGame!.Value,
            Platform = form.Platform,
            Rating = form.Rating
        };
        _db.GameSuggestions.Add(suggestion);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(Thanks), new { id = suggestion.Id });
    }

    // GET: /Home/Thanks/5
    public async Task<IActionResult> Thanks(int id)
    {
        var suggestion = await _db.GameSuggestions.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        if (suggestion == null) return NotFound();
        return View(suggestion);
    }

    // GET: /Home/ListSuggestions?search=&genre=&minPlayers=&available=&sort=&page=
    public async Task<IActionResult> ListSuggestions(string? search, string? genre, string? minPlayers,
        string? available, string? sort, string? page)
    {
        var model = new CatalogViewModel
        {
            Search = string.IsNullOrWhiteSpace(search) ? null : search.Trim(),
            Genre = string.IsNullOrWhiteSpace(genre) ? null : genre.Trim(),
            MinPlayersRaw = minPlayers?.Trim()
        };

        // minPlayers: 1–100 vagy üres; minden más hiba a GET űrlapon.
        if (!string.IsNullOrEmpty(model.MinPlayersRaw))
        {
            if (!int.TryParse(model.MinPlayersRaw, NumberStyles.Integer, CultureInfo.InvariantCulture, out var min))
            {
                ModelState.AddModelError("minPlayers", "A legalább ennyi játékos mezőbe egész számot kell írni.");
            }
            else if (min < 1 || min > 100)
            {
                ModelState.AddModelError("minPlayers", "A legalább ennyi játékos értéke 1 és 100 között kell legyen.");
            }
            else
            {
                model.MinPlayers = min;
            }
        }

        // available: all | true | false (alapérték: all).
        switch ((available ?? "").Trim().ToLowerInvariant())
        {
            case "":
            case "all": model.Available = "all"; break;
            case "true": model.Available = "true"; break;
            case "false": model.Available = "false"; break;
            default:
                ModelState.AddModelError("available", "Az elérhetőség értéke csak all, true vagy false lehet.");
                model.Available = "all";
                break;
        }

        model.Sort = sort switch
        {
            "title_desc" => "title_desc",
            "players_asc" => "players_asc",
            _ => "title_asc"
        };

        // Az archivált ajánlások a normál katalógusból kimaradnak.
        var baseQuery = Active;
        model.ActiveCount = await baseQuery.CountAsync();

        var query = baseQuery;
        if (model.Search != null)
        {
            var term = model.Search.ToLower();
            query = query.Where(s => s.GameTitle.ToLower().Contains(term) || s.Genre.ToLower().Contains(term));
        }
        if (model.Genre != null)
        {
            var g = model.Genre.ToLower();
            query = query.Where(s => s.Genre.ToLower() == g);
        }
        if (model.MinPlayers.HasValue)
        {
            var min = model.MinPlayers.Value;
            query = query.Where(s => s.PlayerCount >= min);
        }
        if (model.Available == "true") query = query.Where(s => s.HasGame);
        else if (model.Available == "false") query = query.Where(s => !s.HasGame);

        // Számlálás, rendezés, lapozás az adatbázisban. Azonos kulcsnál az Id dönt.
        model.TotalCount = await query.CountAsync();
        model.TotalPages = Math.Max(1, (int)Math.Ceiling(model.TotalCount / (double)CatalogViewModel.PageSize));
        model.Page = ClampPage(page, model.TotalPages);

        query = model.Sort switch
        {
            "title_desc" => query.OrderByDescending(s => s.GameTitle).ThenBy(s => s.Id),
            "players_asc" => query.OrderBy(s => s.PlayerCount).ThenBy(s => s.Id),
            _ => query.OrderBy(s => s.GameTitle).ThenBy(s => s.Id)
        };

        model.Items = await query
            .Skip((model.Page - 1) * CatalogViewModel.PageSize)
            .Take(CatalogViewModel.PageSize)
            .ToListAsync();

        model.Genres = await baseQuery.Select(s => s.Genre).Distinct().OrderBy(x => x).ToListAsync();
        model.ByGenre = (await baseQuery
                .GroupBy(s => s.Genre)
                .Select(g => new { Genre = g.Key, Count = g.Count() })
                .OrderByDescending(g => g.Count).ThenBy(g => g.Genre)
                .ToListAsync())
            .Select(g => new GenreCount(g.Genre, g.Count)).ToList();

        return View(model);
    }

    /// <summary>Az oldalszám alsó határa 1, a túl nagy (akár int-túlcsordulású) érték az utolsó oldalra esik.</summary>
    private static int ClampPage(string? raw, int totalPages)
    {
        if (!BigInteger.TryParse(raw?.Trim(), NumberStyles.Integer, CultureInfo.InvariantCulture, out var value))
            return 1;
        if (value < 1) return 1;
        if (value > totalPages) return totalPages;
        return (int)value;
    }

    // GET: /Home/MultiplayerGames
    public async Task<ViewResult> MultiplayerGames()
    {
        var suggestions = await Active
            .Where(s => s.PlayerCount >= 4)
            .OrderBy(s => s.GameTitle).ThenBy(s => s.Id)
            .ToListAsync();
        return View(suggestions);
    }

    // GET: /Home/DistinctGameTitles
    public async Task<ViewResult> DistinctGameTitles()
    {
        var distinctGameTitles = await Active
            .Select(s => s.GameTitle)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync();
        return View(distinctGameTitles);
    }

    // GET: /Home/Details/5?returnUrl=/Home/ListSuggestions?page=2
    public async Task<IActionResult> Details(int id, string? returnUrl)
    {
        var game = await _db.GameSuggestions.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();

        // Csak az alkalmazáson belüli visszatérési URL fogadható el (open redirect ellen).
        var local = !string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl);
        var back = local
            ? returnUrl!
            : (game.IsArchived ? Url.Action(nameof(ArchivedSuggestions))! : Url.Action(nameof(ListSuggestions))!);

        return View(new SuggestionDetailsViewModel
        {
            Suggestion = game,
            BackUrl = back,
            ReturnUrl = local ? returnUrl : null
        });
    }

    // GET: /Home/Edit/5
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var game = await _db.GameSuggestions.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();
        if (game.IsArchived) return StatusCode(StatusCodes.Status409Conflict);

        return View(new SuggestionEditModel
        {
            Id = game.Id,
            RecommendedBy = game.Name,
            GameTitle = game.GameTitle,
            Genre = game.Genre,
            PlayerCount = game.PlayerCount,
            HasGame = game.HasGame,
            Platform = game.Platform,
            Rating = game.Rating
        });
    }

    // POST: /Home/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, SuggestionEditModel form)
    {
        var game = await _db.GameSuggestions.FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();
        if (game.IsArchived) return StatusCode(StatusCodes.Status409Conflict);

        if (!ModelState.IsValid)
        {
            // Az oldal őrzi a beírt értékeket.
            form.Id = game.Id;
            form.RecommendedBy = game.Name;
            return View(form);
        }

        game.GameTitle = form.GameTitle!;
        game.Genre = form.Genre!;
        game.PlayerCount = form.PlayerCount!.Value;
        game.HasGame = form.HasGame!.Value;
        game.Platform = form.Platform;
        game.Rating = form.Rating;
        await _db.SaveChangesAsync();

        TempData["Message"] = "Az ajánlás módosításai mentve.";
        return RedirectToAction(nameof(Details), new { id = game.Id });
    }

    // GET: /Home/ArchiveConfirm/5
    [HttpGet]
    public async Task<IActionResult> ArchiveConfirm(int id)
    {
        var game = await _db.GameSuggestions.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();
        if (game.IsArchived) return RedirectToAction(nameof(Details), new { id });
        return View(game);
    }

    // POST: /Home/Archive/5 – ismételt archiválásnál az állapot változatlan marad
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Archive(int id)
    {
        var game = await _db.GameSuggestions.FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();

        if (!game.IsArchived)
        {
            game.IsArchived = true;
            await _db.SaveChangesAsync();
            TempData["Message"] = "Az ajánlás archiválva lett.";
        }
        return RedirectToAction(nameof(Details), new { id });
    }

    // POST: /Home/Restore/5 – ismételt visszaállításnál az állapot változatlan marad
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Restore(int id)
    {
        var game = await _db.GameSuggestions.FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();

        if (game.IsArchived)
        {
            game.IsArchived = false;
            await _db.SaveChangesAsync();
            TempData["Message"] = "Az ajánlás vissza lett állítva a katalógusba.";
        }
        return RedirectToAction(nameof(Details), new { id });
    }

    // GET: /Home/ArchivedSuggestions – az archívum külön a normál katalógustól
    public async Task<ViewResult> ArchivedSuggestions()
    {
        var archived = await _db.GameSuggestions.AsNoTracking()
            .Where(s => s.IsArchived)
            .OrderBy(s => s.GameTitle).ThenBy(s => s.Id)
            .ToListAsync();
        return View(archived);
    }

    // POST : /Home/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var game = await _db.GameSuggestions.FirstOrDefaultAsync(s => s.Id == id);
        if (game == null) return NotFound();

        // Játékesthez tartozó ajánlás nem törölhető (korlátozó törlés), helyette archiválni lehet.
        if (await _db.GameEvents.AnyAsync(e => e.GameSuggestionId == id))
        {
            TempData["Error"] = "Az ajánláshoz játékest tartozik, ezért nem törölhető. Archiváld helyette.";
            return RedirectToAction(nameof(Details), new { id });
        }

        _db.GameSuggestions.Remove(game);
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(ListSuggestions));
    }
}

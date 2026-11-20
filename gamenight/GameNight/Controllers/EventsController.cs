using GameNight.Data;
using GameNight.Models;
using GameNight.Services;
using GameNight.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace GameNight.Controllers;

public class EventsController : Controller
{
    private readonly GameNightDbContext _db;
    private readonly RegistrationService _registrations;
    private readonly TimeProvider _time;

    public EventsController(GameNightDbContext db, RegistrationService registrations, TimeProvider time)
    {
        _db = db;
        _registrations = registrations;
        _time = time;
    }

    private DateTime UtcNow => _time.GetUtcNow().UtcDateTime;

    // GET: /Events?all=true – alapnézet: jövőbeli Planned események; a kapcsolóval az összes
    public async Task<IActionResult> Index(bool all = false)
    {
        var now = UtcNow;
        var query = _db.GameEvents.AsNoTracking().AsQueryable();
        if (!all)
        {
            query = query.Where(e => e.Status == EventStatus.Planned && e.StartsAtUtc > now);
        }

        var items = await query
            .OrderBy(e => e.StartsAtUtc).ThenBy(e => e.Id)
            .Select(e => new EventListItem
            {
                Id = e.Id,
                Title = e.Title,
                GameTitle = e.GameSuggestion!.GameTitle,
                StartsAtUtc = e.StartsAtUtc,
                Location = e.Location,
                Capacity = e.Capacity,
                Status = e.Status
            })
            .ToListAsync();

        return View(new EventListViewModel { Items = items, ShowAll = all });
    }

    // GET: /Events/Details/5
    public async Task<IActionResult> Details(int id)
    {
        var model = await BuildDetailsAsync(id);
        if (model == null) return NotFound();

        // Csak közvetlenül a sikeres jelentkezés után (átirányítás után egyszer) jelenik meg a nyers kód.
        model.NewRegistrationStatus = TempData["RegistrationStatus"] as string;
        model.NewWithdrawalCode = TempData["WithdrawalCode"] as string;
        return View(model);
    }

    // GET: /Events/Create?gameId=3
    [HttpGet]
    public async Task<IActionResult> Create(int? gameId)
    {
        var form = new GameEventFormViewModel { GameSuggestionId = gameId };
        form.Games = await LoadGamesAsync(gameId);
        return View("Form", form);
    }

    // POST: /Events/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(GameEventFormViewModel form)
    {
        var startsAtUtc = await ValidateFormAsync(form);
        if (!ModelState.IsValid || startsAtUtc == null)
        {
            form.Games = await LoadGamesAsync(form.GameSuggestionId);
            return View("Form", form);
        }

        var ev = new GameEvent
        {
            Title = form.Title!,
            StartsAtUtc = startsAtUtc.Value,
            Location = form.Location!,
            Capacity = form.Capacity!.Value,
            Status = EventStatus.Planned,
            GameSuggestionId = form.GameSuggestionId!.Value
        };
        _db.GameEvents.Add(ev);
        await _db.SaveChangesAsync();

        TempData["Message"] = "A játékest létrejött.";
        return RedirectToAction(nameof(Details), new { id = ev.Id });
    }

    // GET: /Events/Edit/5 – csak jövőbeli Planned esemény szerkeszthető, különben 409
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var ev = await _db.GameEvents.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
        if (ev == null) return NotFound();
        if (!RegistrationService.IsOpen(ev, UtcNow)) return StatusCode(StatusCodes.Status409Conflict);

        var form = new GameEventFormViewModel
        {
            Id = ev.Id,
            Title = ev.Title,
            StartsAtLocal = HungarianTime.ToInputValue(ev.StartsAtUtc),
            Location = ev.Location,
            Capacity = ev.Capacity,
            GameSuggestionId = ev.GameSuggestionId
        };
        form.Games = await LoadGamesAsync(ev.GameSuggestionId);
        return View("Form", form);
    }

    // POST: /Events/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, GameEventFormViewModel form)
    {
        var ev = await _db.GameEvents.FirstOrDefaultAsync(e => e.Id == id);
        if (ev == null) return NotFound();
        if (!RegistrationService.IsOpen(ev, UtcNow)) return StatusCode(StatusCodes.Status409Conflict);

        form.Id = id;
        var startsAtUtc = await ValidateFormAsync(form);
        if (!ModelState.IsValid || startsAtUtc == null)
        {
            form.Games = await LoadGamesAsync(form.GameSuggestionId, ev.GameSuggestionId);
            return View("Form", form);
        }

        ev.Title = form.Title!;
        ev.StartsAtUtc = startsAtUtc.Value;
        ev.Location = form.Location!;
        ev.Capacity = form.Capacity!.Value;
        ev.GameSuggestionId = form.GameSuggestionId!.Value;
        await _db.SaveChangesAsync();

        TempData["Message"] = "A játékest módosításai mentve.";
        return RedirectToAction(nameof(Details), new { id });
    }

    // POST: /Events/Register/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(int id,
        [Bind(Prefix = nameof(EventDetailsViewModel.Register))] RegistrationInputModel input)
    {
        if (!await _db.GameEvents.AnyAsync(e => e.Id == id)) return NotFound();

        if (!ModelState.IsValid)
        {
            return await DetailsWithInputAsync(id, register: input);
        }

        var result = await _registrations.RegisterAsync(id, input.DisplayName!, input.Email!);
        switch (result.Outcome)
        {
            case RegistrationOutcome.Registered:
                TempData["RegistrationStatus"] = result.Registration!.Status == RegistrationStatus.Confirmed
                    ? "Sikeres jelentkezés! A helyed igazolt."
                    : "Sikeres jelentkezés! Az esemény megtelt, ezért a várólistára kerültél.";
                TempData["WithdrawalCode"] = result.RawCode;
                return RedirectToParticipation(id);

            case RegistrationOutcome.Duplicate:
                ModelState.AddModelError("Register.Email", "Ezzel az e-mail-címmel már jelentkeztek erre az eseményre.");
                break;

            case RegistrationOutcome.PreviouslyWithdrawn:
                ModelState.AddModelError("Register.Email",
                    "Ezzel az e-mail-címmel a jelentkezést korábban visszavonták, ezért új jelentkezés nem lehetséges.");
                break;

            case RegistrationOutcome.EventClosed:
                ModelState.AddModelError(string.Empty, "Erre az eseményre már nem lehet jelentkezni.");
                break;

            default:
                return NotFound();
        }

        return await DetailsWithInputAsync(id, register: input);
    }

    // POST: /Events/Withdraw/5 – jelentkezés visszavonása e-mail-címmel és kezelőkóddal
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Withdraw(int id,
        [Bind(Prefix = nameof(EventDetailsViewModel.Withdraw))] WithdrawalInputModel input)
    {
        if (!await _db.GameEvents.AnyAsync(e => e.Id == id)) return NotFound();

        if (!ModelState.IsValid)
        {
            return await DetailsWithInputAsync(id, withdraw: input);
        }

        var result = await _registrations.WithdrawAsync(id, input.Email!, input.Code!);
        switch (result.Outcome)
        {
            case WithdrawalOutcome.Withdrawn:
                TempData["Message"] = "A jelentkezésedet visszavontad.";
                return RedirectToParticipation(id);

            case WithdrawalOutcome.AlreadyWithdrawn:
                TempData["Message"] = "Ez a jelentkezés már korábban vissza lett vonva.";
                return RedirectToParticipation(id);

            case WithdrawalOutcome.EventClosed:
                ModelState.AddModelError(string.Empty, "A jelentkezés visszavonása ennél az eseménynél már nem lehetséges.");
                break;

            case WithdrawalOutcome.InvalidCredentials:
                ModelState.AddModelError("Withdraw.Code", "Az e-mail-cím vagy a kezelőkód hibás.");
                break;

            default:
                return NotFound();
        }

        return await DetailsWithInputAsync(id, withdraw: input);
    }

    private IActionResult RedirectToParticipation(int id) =>
        Redirect(Url.Action(nameof(Details), new { id }) + "#participation");

    private async Task<IActionResult> DetailsWithInputAsync(int id, RegistrationInputModel? register = null,
        WithdrawalInputModel? withdraw = null)
    {
        var model = await BuildDetailsAsync(id);
        if (model == null) return NotFound();
        if (register != null) model.Register = register;
        if (withdraw != null) model.Withdraw = withdraw;
        return View("Details", model);
    }

    private async Task<EventDetailsViewModel?> BuildDetailsAsync(int id)
    {
        var ev = await _db.GameEvents.AsNoTracking()
            .Include(e => e.GameSuggestion)
            .FirstOrDefaultAsync(e => e.Id == id);
        if (ev == null) return null;

        var counts = await _db.EventRegistrations.AsNoTracking()
            .Where(r => r.GameEventId == id)
            .GroupBy(r => r.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        return new EventDetailsViewModel
        {
            Id = ev.Id,
            Title = ev.Title,
            GameSuggestionId = ev.GameSuggestionId,
            GameTitle = ev.GameSuggestion!.GameTitle,
            StartsAtUtc = ev.StartsAtUtc,
            Location = ev.Location,
            Capacity = ev.Capacity,
            Status = ev.Status,
            ConfirmedCount = counts.FirstOrDefault(c => c.Status == RegistrationStatus.Confirmed)?.Count ?? 0,
            WaitlistedCount = counts.FirstOrDefault(c => c.Status == RegistrationStatus.Waitlisted)?.Count ?? 0,
            IsOpen = RegistrationService.IsOpen(ev, UtcNow)
        };
    }

    /// <summary>
    /// Az űrlap üzleti szabályai: budapesti helyi idő (nyári időszámítás), jövőbeli időpont,
    /// aktív és elérhető ajánlás. Siker esetén az UTC időpontot adja vissza.
    /// </summary>
    private async Task<DateTime?> ValidateFormAsync(GameEventFormViewModel form)
    {
        DateTime? startsAtUtc = null;

        // Üres értéknél a Required attribútum már hibát adott.
        if (!string.IsNullOrWhiteSpace(form.StartsAtLocal))
        {
            if (!HungarianTime.TryParseLocal(form.StartsAtLocal, out var utc, out var error))
            {
                ModelState.AddModelError(nameof(form.StartsAtLocal), error!);
            }
            else if (utc <= UtcNow)
            {
                ModelState.AddModelError(nameof(form.StartsAtLocal), "A kezdésnek jövőbeli időpontnak kell lennie.");
            }
            else
            {
                startsAtUtc = utc;
            }
        }

        if (form.GameSuggestionId.HasValue)
        {
            var game = await _db.GameSuggestions.AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == form.GameSuggestionId.Value);
            if (game == null)
            {
                ModelState.AddModelError(nameof(form.GameSuggestionId), "A kiválasztott játék nem létezik.");
            }
            else if (game.IsArchived)
            {
                ModelState.AddModelError(nameof(form.GameSuggestionId), "Archivált ajánláshoz nem hozható létre játékest.");
            }
            else if (!game.HasGame)
            {
                ModelState.AddModelError(nameof(form.GameSuggestionId), "Csak elérhető játékhoz hozható létre játékest.");
            }
        }

        return startsAtUtc;
    }

    /// <summary>Az aktív, elérhető ajánlások (szerkesztésnél a jelenlegi játék is szerepel).</summary>
    private async Task<IEnumerable<SelectListItem>> LoadGamesAsync(int? selectedId, int? currentId = null)
    {
        var games = await _db.GameSuggestions.AsNoTracking()
            .Where(s => (!s.IsArchived && s.HasGame) || s.Id == currentId)
            .OrderBy(s => s.GameTitle).ThenBy(s => s.Id)
            .Select(s => new { s.Id, s.GameTitle, s.IsArchived, s.HasGame })
            .ToListAsync();

        return games.Select(g => new SelectListItem(
            g.IsArchived || !g.HasGame ? $"{g.GameTitle} (nem választható)" : g.GameTitle,
            g.Id.ToString(),
            g.Id == selectedId));
    }
}

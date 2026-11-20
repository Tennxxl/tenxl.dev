using GameNight.Data;
using GameNight.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews(options =>
{
    // Magyar nyelvű modellkötési hibaüzenetek (pl. számmezőbe írt szöveg).
    var messages = options.ModelBindingMessageProvider;
    messages.SetValueMustBeANumberAccessor(field => $"A(z) {field} mezőbe számot kell írni.");
    messages.SetAttemptedValueIsInvalidAccessor((value, field) => $"A(z) '{value}' érték érvénytelen a(z) {field} mezőben.");
    messages.SetValueIsInvalidAccessor(value => $"A(z) '{value}' érték érvénytelen.");
    messages.SetUnknownValueIsInvalidAccessor(field => $"A(z) {field} mező értéke érvénytelen.");
    messages.SetMissingBindRequiredValueAccessor(field => $"A(z) {field} mező megadása kötelező.");
    messages.SetMissingKeyOrValueAccessor(() => "Az érték megadása kötelező.");
    messages.SetMissingRequestBodyRequiredValueAccessor(() => "A kérés törzse hiányzik.");
});

var connectionString = builder.Configuration.GetConnectionString("GameNight")
    ?? throw new InvalidOperationException("Hiányzik a ConnectionStrings:GameNight beállítás.");
// A szerververzió konfigurálható (pl. "8.0.36-mysql" vagy "10.11.0-mariadb"), így indításkor nincs extra kapcsolat.
var serverVersion = ServerVersion.Parse(builder.Configuration["Database:ServerVersion"] ?? "8.0.36-mysql");

builder.Services.AddDbContext<GameNightDbContext>(options => options.UseMySql(connectionString, serverVersion));
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped<RegistrationService>();

var app = builder.Build();

if (app.Configuration.GetValue("Database:InitializeOnStartup", true))
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<GameNightDbContext>();
    db.Database.Migrate();
    SeedData.Seed(db, scope.ServiceProvider.GetRequiredService<TimeProvider>());
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// A hiányzó rekord / ütközés (404, 409) érthető oldalt kapjon.
app.UseStatusCodePagesWithReExecute("/Home/HttpStatus", "?code={0}");

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();

// A WebApplicationFactory-hoz (integrációs tesztek).
public partial class Program { }

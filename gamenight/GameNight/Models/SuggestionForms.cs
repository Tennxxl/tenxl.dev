using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GameNight.Models
{
    /// <summary>A platformlistán kívüli értéket hibaként jelzi (a szerver is ellenőriz).</summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class AllowedPlatformAttribute : ValidationAttribute
    {
        public AllowedPlatformAttribute()
        {
            ErrorMessage = "A {0} csak a következők egyike lehet: " + string.Join(", ", Platforms.All) + ".";
        }

        public override bool IsValid(object? value) => value == null || Platforms.IsAllowed(value as string);
    }

    /// <summary>A felvitel és a szerkesztés közös mezői. Külön űrlapmodell: nincs túlkötés (overposting).</summary>
    public abstract class SuggestionFormBase
    {
        private string? _gameTitle;
        private string? _genre;
        private string? _platform;

        [Display(Name = "Játék címe")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "A {0} hossza {2} és {1} karakter között kell legyen.")]
        public string? GameTitle
        {
            get => _gameTitle;
            set => _gameTitle = value?.Trim();
        }

        [Display(Name = "Műfaj")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(50, ErrorMessage = "A {0} hossza maximum {1} karakter lehet.")]
        public string? Genre
        {
            get => _genre;
            set => _genre = value?.Trim();
        }

        [Display(Name = "Játékosok száma")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [Range(1, 100, ErrorMessage = "A {0} {1} és {2} között kell legyen.")]
        public int? PlayerCount { get; set; }

        [Display(Name = "Elérhető a játék?")]
        [Required(ErrorMessage = "A {0} mező kiválasztása kötelező.")]
        public bool? HasGame { get; set; }

        [Display(Name = "Platform")]
        [StringLength(40, ErrorMessage = "A {0} hossza maximum {1} karakter lehet.")]
        [AllowedPlatform]
        public string? Platform
        {
            get => _platform;
            set => _platform = string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        [Display(Name = "Értékelés")]
        [Range(1, 5, ErrorMessage = "Az {0} 1 és 5 közötti egész szám lehet.")]
        public int? Rating { get; set; }
    }

    /// <summary>Új ajánlás felvitele.</summary>
    public class SuggestionCreateModel : SuggestionFormBase
    {
        private string? _name;

        [Display(Name = "Név")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(30, ErrorMessage = "A {0} hossza maximum {1} karakter lehet.")]
        public string? Name
        {
            get => _name;
            set => _name = value?.Trim();
        }
    }

    /// <summary>Meglévő ajánlás szerkesztése. Az azonosító az URL-ből jön, nem az űrlapból.</summary>
    public class SuggestionEditModel : SuggestionFormBase
    {
        [BindNever]
        public int Id { get; set; }

        [BindNever]
        public string? RecommendedBy { get; set; }
    }
}

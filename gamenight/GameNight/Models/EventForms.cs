using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GameNight.Models
{
    /// <summary>Játékest felvitelének és szerkesztésének ViewModelje.</summary>
    public class GameEventFormViewModel
    {
        private string? _title;
        private string? _location;

        [BindNever]
        public int? Id { get; set; }

        [BindNever]
        public bool IsEdit => Id.HasValue;

        [BindNever]
        public IEnumerable<SelectListItem> Games { get; set; } = Array.Empty<SelectListItem>();

        [Display(Name = "Cím")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(80, MinimumLength = 3, ErrorMessage = "A {0} hossza {2} és {1} karakter között kell legyen.")]
        public string? Title
        {
            get => _title;
            set => _title = value?.Trim();
        }

        /// <summary>Budapesti helyi idő, "yyyy-MM-ddTHH:mm" (datetime-local) formában.</summary>
        [Display(Name = "Kezdés (budapesti idő)")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        public string? StartsAtLocal { get; set; }

        [Display(Name = "Helyszín")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "A {0} hossza {2} és {1} karakter között kell legyen.")]
        public string? Location
        {
            get => _location;
            set => _location = value?.Trim();
        }

        [Display(Name = "Kapacitás")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [Range(2, 30, ErrorMessage = "A {0} {1} és {2} fő között kell legyen.")]
        public int? Capacity { get; set; }

        [Display(Name = "Játék")]
        [Required(ErrorMessage = "A {0} kiválasztása kötelező.")]
        public int? GameSuggestionId { get; set; }
    }

    /// <summary>Jelentkezés bemeneti modellje.</summary>
    public class RegistrationInputModel
    {
        private string? _displayName;
        private string? _email;

        [Display(Name = "Név")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(80, MinimumLength = 2, ErrorMessage = "A {0} hossza {2} és {1} karakter között kell legyen.")]
        public string? DisplayName
        {
            get => _displayName;
            set => _displayName = value?.Trim();
        }

        [Display(Name = "E-mail-cím")]
        [Required(ErrorMessage = "A {0} mező megadása kötelező.")]
        [StringLength(254, ErrorMessage = "Az {0} legfeljebb {1} karakter lehet.")]
        [EmailAddress(ErrorMessage = "Az {0} formátuma érvénytelen.")]
        public string? Email
        {
            get => _email;
            set => _email = value?.Trim();
        }
    }

    /// <summary>Jelentkezés visszavonásának bemeneti modellje (e-mail-cím és kezelőkód).</summary>
    public class WithdrawalInputModel
    {
        private string? _email;

        [Display(Name = "E-mail-cím")]
        [Required(ErrorMessage = "Az {0} megadása kötelező.")]
        [StringLength(254, ErrorMessage = "Az {0} legfeljebb {1} karakter lehet.")]
        [EmailAddress(ErrorMessage = "Az {0} formátuma érvénytelen.")]
        public string? Email
        {
            get => _email;
            set => _email = value?.Trim();
        }

        [Display(Name = "Kezelőkód")]
        [Required(ErrorMessage = "A {0} megadása kötelező.")]
        [StringLength(100, ErrorMessage = "A {0} legfeljebb {1} karakter lehet.")]
        public string? Code { get; set; }
    }
}

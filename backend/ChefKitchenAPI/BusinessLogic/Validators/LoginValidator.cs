using BusinessLogic.DTOs;
using FluentValidation;

namespace BusinessLogic.Validators
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        const string emailPattern = @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";

        // Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const string passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$";



        public LoginValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .Matches(emailPattern)
                .WithMessage("Email error. Please use \"@\" symbol and valid domain");

            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull()
                .Length(8, 20)
                .Matches(passwordPattern)
                .WithMessage("Password should be 8-20 symbols long and contain uppercase and lowercase letters, numbers and special characters");
        }
    }
}

using BusinessLogic.DTOs;
using FluentValidation;





namespace BusinessLogic.Validators
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        // Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const string PASSWORD_PATTERN   =   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$";
        const string PASSWORD_ERROR     =   "Password should be 8-20 symbols long and contain uppercase and lowercase letters, numbers and special characters";
        const string EMAIL_PATTERN      =   @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
        const string EMAIL_ERROR        =   "Email error. Please use '@' symbol and valid domain";



		public LoginValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .NotNull()
                .Matches(EMAIL_PATTERN)
                .WithMessage(EMAIL_ERROR);
            //.WithErrorCode(nameof(LoginValidationErrorType.InvalidEmail));


            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull()
                .Length(8, 20)
                .Matches(PASSWORD_PATTERN)
                .WithMessage(PASSWORD_ERROR);
				//.WithErrorCode(nameof(LoginValidationErrorType.InvalidPassword));
		}
    }
}

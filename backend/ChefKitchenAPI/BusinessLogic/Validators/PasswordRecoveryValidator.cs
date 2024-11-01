using BusinessLogic.DTOs;
using FluentValidation;

namespace BusinessLogic.Validators
{
	public class PasswordRecoveryValidator : AbstractValidator<PasswordRecoveryModel>
	{
		public PasswordRecoveryValidator()
		{
			const string PASSWORD_PATTERN					=	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$";
			const string PASSWORD_PATTERN_ERROR				=	"Password should be 8-20 symbols long and contain uppercase and lowercase letters, numbers and special characters";
			const string PASSWORD_EMPTY_ERROR				=	"'Password' field may not be empty";
			const string CONFIRM_PASSWORD_NO_MATCH_ERROR	=	"Passwords do not match";
			const string CONFIRM_PASSWORD_EMPTY_ERROR		=	"'Confirm Password' field may not be empty";
			const string EMAIL_PATTERN						=	@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
			const string EMAIL_PATTERN_ERROR				=	"Email error. Please use '@' symbol and valid domain";
			const string EMAIL_EMPTY_ERROR					=	"Email field may not be empty";



			RuleFor(x => x.ConfirmPassword)
				.NotEmpty().WithMessage(CONFIRM_PASSWORD_EMPTY_ERROR)
				.Equal(x => x.Password).WithMessage(CONFIRM_PASSWORD_NO_MATCH_ERROR);

			RuleFor(x => x.Password)
				.NotEmpty().WithMessage(PASSWORD_EMPTY_ERROR)
				.Matches(PASSWORD_PATTERN).WithMessage(PASSWORD_PATTERN_ERROR);

			RuleFor(x => x.UserEmail)
				.NotEmpty().WithMessage(EMAIL_EMPTY_ERROR)
				.Matches(EMAIL_PATTERN).WithMessage(EMAIL_PATTERN_ERROR);
		}
	}
}

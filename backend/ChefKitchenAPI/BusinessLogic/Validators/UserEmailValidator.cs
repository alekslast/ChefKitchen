using BusinessLogic.DTOs;
using FluentValidation;
using Microsoft.AspNetCore.Identity.Data;





namespace BusinessLogic.Validators
{
	public class UserEmailValidator : AbstractValidator<UserEmailForRecovery>
	{
		public UserEmailValidator()
		{
			const string EMAIL_PATTERN	=	@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";
			const string EMAIL_ERROR	=	"Email error. Please use '@' symbol and valid domain";



			RuleFor(x => x.Email)
				.NotEmpty()
				.Matches(EMAIL_PATTERN).WithMessage(EMAIL_ERROR);
		}
	}
}

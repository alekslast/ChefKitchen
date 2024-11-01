using BusinessLogic.DTOs;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic.Validators
{
	public class ValidatorViewModel
    {
		public ValidatorViewModel(IServiceCollection services)
		{
			services.AddTransient<IValidator<LoginRequest>, LoginValidator>();
		}
    }
}

using BusinessLogic.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;





namespace ChefKitchenAPI.Filters
{
	public class LoginErrorFilter : IActionFilter
	{
		public void OnActionExecuting(ActionExecutingContext context)
		{
			if (!context.ModelState.IsValid)
			{
				var errors = context.ModelState.Values.SelectMany(v => v.Errors);
				var validationErrors = new List<LoginValidationError>();

				foreach (var error in errors)
				{
					var errorCode = error.ErrorMessage.Contains("Invalid email")
						? LoginValidationErrorType.InvalidEmail
						: LoginValidationErrorType.InvalidPassword;

					validationErrors.Add(new LoginValidationError
					{
						ErrorType = errorCode,
						ErrorMessage = error.ErrorMessage
					});
				}

				context.Result = new BadRequestObjectResult(validationErrors);
			}
		}

		public void OnActionExecuted(ActionExecutedContext context)
		{
			// Ничего не делаем
		}

	}

	
}

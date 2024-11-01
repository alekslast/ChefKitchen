namespace BusinessLogic.Validators
{
	public class LoginValidationError
	{
		public LoginValidationErrorType ErrorType { get; set; }
		public string ErrorMessage { get; set; }
	}



	public enum LoginValidationErrorType
	{
		InvalidEmail,
		InvalidPassword,
	}
}

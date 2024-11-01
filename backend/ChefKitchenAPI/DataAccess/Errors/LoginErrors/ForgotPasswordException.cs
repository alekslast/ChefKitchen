namespace DataAccess.Errors.LoginErrors
{
	public class ForgotPasswordException : Exception
	{
		public ForgotPasswordException(string message = "Invalid email") : base(message)
		{
		}
	}
}

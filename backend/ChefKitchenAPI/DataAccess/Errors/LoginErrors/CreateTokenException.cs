namespace DataAccess.Errors.LoginErrors
{
	public class CreateTokenException : Exception
	{
		public CreateTokenException(string message = "Error creating tokens") : base(message)
		{
		}
	}
}

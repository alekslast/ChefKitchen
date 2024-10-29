namespace Infrastructure.InfrastructErrors
{
    public class WrongPasswordException : Exception
    {
        public WrongPasswordException(string message = "Wrong password") : base(message)
        {
        }
    }
}

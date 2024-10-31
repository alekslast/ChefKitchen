namespace BusinessLogic.BusinessErrors
{
    public class WrongPasswordException : Exception
    {
        public WrongPasswordException(string message = "Wrong password") : base(message)
        {
        }
    }
}

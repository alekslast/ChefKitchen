namespace DataAccess.Errors.UserErrors
{
    public class EmailExistsException : Exception
    {
        //public UserEmailExistsException(string message = "Email") : base(message)
        public EmailExistsException(string email) : base($"Email {email} is already registered")
        {
        }
    }
}

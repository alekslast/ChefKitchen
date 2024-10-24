namespace DataAccess.Errors.UserErrors
{
    public class PhoneExistsException : Exception
    {
        public PhoneExistsException(string phone) : base($"Phone number {phone} is already registered") 
        {

        }
    }
}

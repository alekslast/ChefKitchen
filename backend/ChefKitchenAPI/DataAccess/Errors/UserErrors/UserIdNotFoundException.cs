namespace DataAccess.Errors.UserErrors
{
    public class UserIdNotFoundException : Exception
    {
        public UserIdNotFoundException(int id) : base($"User with ID {id} has not been found")
        {

        }
    }
}

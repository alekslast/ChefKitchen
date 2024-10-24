namespace DataAccess.Errors.UserErrors
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException() : base("User not found")
        {
            //Data.Add(AbstractExceptionHandlerMiddleware.LocalizationKey, localizerKey);
        }
    }
}

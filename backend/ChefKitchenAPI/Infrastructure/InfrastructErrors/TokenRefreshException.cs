namespace Infrastructure.InfrastructErrors
{
    public class TokenRefreshException : Exception
    {
        public TokenRefreshException(string message = "Could not update token during login") : base(message)
        {
        }
    }
}

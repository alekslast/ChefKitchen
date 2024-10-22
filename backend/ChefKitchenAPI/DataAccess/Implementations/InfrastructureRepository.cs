using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Implementations
{
    public class InfrastructureRepository(RestaurantContext dbContext) : IInfrastructureRepository
    {

        public int SaveRefreshToken(RefreshTokenModel refreshToken)
        {
            try
            {
                dbContext.RefreshTokens.Add(refreshToken);
                dbContext.SaveChanges();


                return refreshToken.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public bool RevokeToken(RefreshTokenModel token)
        {

            return true;
        }
    }
}

using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Implementations
{
    public class InfrastructureRepository(RestaurantContext dbContext) : IInfrastructureRepository
    {
        public RefreshTokenModel? GetToken(string token)
        {
            RefreshTokenModel? foundToken = dbContext.RefreshTokens.FirstOrDefault(x => x.Token == token);

            if (foundToken is null)
                return null;


            return foundToken;
        }





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

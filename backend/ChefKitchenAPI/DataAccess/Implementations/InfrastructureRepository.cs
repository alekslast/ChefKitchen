using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Implementations
{
    public class InfrastructureRepository(RestaurantContext dbContext) : IInfrastructureRepository
    {
        public RefreshTokenModel? GetToken(string token)
        {
            RefreshTokenModel? foundToken = dbContext.RefreshTokens.Include(rt => rt.User).FirstOrDefault(x => x.Token == token);

            if (foundToken is null)
                return null;


            return foundToken;
        }





        public int SaveRefreshToken(RefreshTokenModel refreshToken)
        {
            try
            {
                var user = dbContext.Users.Include(x => x.RefreshTokens).FirstOrDefault(x => x.Id == refreshToken.User.Id);
                user.RefreshTokens.Add(refreshToken);
                //dbContext.RefreshTokens.Add(refreshToken);
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

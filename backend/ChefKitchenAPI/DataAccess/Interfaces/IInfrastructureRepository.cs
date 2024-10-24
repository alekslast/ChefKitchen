using DataAccess.Models;

namespace DataAccess.Interfaces
{
    public interface IInfrastructureRepository
    {
        RefreshTokenModel? GetToken(string token);
        int SaveRefreshToken(RefreshTokenModel refreshToken);
        bool RevokeToken(RefreshTokenModel token);
    }
}

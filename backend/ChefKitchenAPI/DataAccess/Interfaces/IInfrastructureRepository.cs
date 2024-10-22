using DataAccess.Models;

namespace DataAccess.Interfaces
{
    public interface IInfrastructureRepository
    {
        int SaveRefreshToken(RefreshTokenModel refreshToken);
        bool RevokeToken(RefreshTokenModel token);
    }
}

using DataAccess.Models;





namespace Infrastructure.Interfaces
{
    public interface IInfrastructureServices
    {
        //(string tokenJwt, RefreshTokenModel? tokenRefresh) Login(LoginRequest loginRequest);
        //int                 CreateNewUser           (UserDto userDto);
        string              CreateJwtToken                  (UserModel user);
        RefreshTokenModel   GenerateRefreshToken            ();
        string              RegenerateRefreshToken          (string expiredToken);
        bool                ValidateRefreshToken            (string refreshToken);
        bool                ValidateJwtToken                (string token);
        string              Hash                            (string password);
        bool                VerifyPasswordAgainstHash       (string password, string passwordHash);
        void                SendEmail                       (string receiver, string subject, string body);
        string              GenerateResetCode               ();

	}
}

using BusinessLogic.DTOs;
using DataAccess.Models;





namespace Infrastructure.Interfaces
{
    public interface IInfrastructureServices
    {
        (string tokenJwt, RefreshTokenModel? tokenRefresh) Login           (LoginRequest loginRequest);
        int         CreateNewUser   (UserDto userDto);
        string      CreateToken     (UserDto user);
        string      Hash            (string password);
        bool        Verify          (string password, string passwordHash);
    }
}

using BusinessLogic.DTOs;
using DataAccess.Models;





namespace BusinessLogic.Interfaces
{
    public interface IUserService
    {
        (string tokenJwt, RefreshTokenModel? tokenRefresh) Login(LoginRequest loginRequest);
        int CreateNewUser(UserDto userDto);
        UserDto? AuthWithEmail(string email);
        UserDto? AuthWithPhone(string phone);
        bool Update(UserDto user);
        UserDto GetOne(int id);
        List<UserDto> GetAll();
        bool Delete(int id);
    }
}

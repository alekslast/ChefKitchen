using BusinessLogic.DTOs;
using DataAccess.Models;
using static BusinessLogic.Services.UserService;





namespace BusinessLogic.Interfaces
{
    public interface IUserService
    {
        UserDto? AuthWithEmail(string email);
        UserDto? AuthWithPhone(string phone);
        bool Update(UserDto user);
        UserDto GetOne(int id);
        List<UserDto> GetAll();
        bool Delete(int id);
    }
}

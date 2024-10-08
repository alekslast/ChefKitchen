using BusinessLogic.DTOs;
using DataAccess.Models;





namespace BusinessLogic.Interfaces
{
    public interface IUserService
    {
        UserDto? AuthWithEmail(string email);
        UserDto? AuthWithPhone(string phone);
        int Create(UserDto user);
        bool Update(UserDto user);
        UserDto GetOne(int id);
        List<UserDto> GetAll();
        bool Delete(int id);
    }
}

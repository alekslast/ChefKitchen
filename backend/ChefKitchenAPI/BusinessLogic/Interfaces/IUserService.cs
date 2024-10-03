using BusinessLogic.DTOs;
using DataAccess.Models;





namespace BusinessLogic.Interfaces
{
    public interface IUserService
    {
        int Create(UserDto user);
        bool Update(UserDto user);
        UserDto GetOne(int id);
        List<UserDto> GetAll();
        bool Delete(int id);
    }
}

using DataAccess.Models;

namespace DataAccess.Interfaces
{
    public interface IUserRepository
    {
        UserModel?          AuthWithEmail(string email);
        UserModel?          AuthWithPhone(string phone);
        int                 Create      (UserModel user);
        bool                Update      (UserModel user);
        UserModel           GetOne      (int id);
        List<UserModel>     GetAll      ();
        bool                Delete      (int id);
    }
}

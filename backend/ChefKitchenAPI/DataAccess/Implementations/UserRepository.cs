using DataAccess.Interfaces;
using DataAccess.Models;





namespace DataAccess.Implementations
{
    public class UserRepository : IUserRepository
    {
        public UserRepository()
        {

        }





        public int Create(UserModel user)
        {

            return user.Id;
        }





        public bool Update(UserModel user)
        {
            return true;
        }





        public UserModel GetOne(int id)
        {
            UserModel user = new();

            return user;
        }





        public List<UserModel> GetAll()
        {
            List<UserModel> userList = new();

            return userList;
        }





        public bool Delete(int id)
        {
            return true;
        }
    }
}

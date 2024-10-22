using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;





namespace DataAccess.Implementations
{
    public class UserRepository : IUserRepository
    {
        readonly RestaurantContext _dbContext;



        public UserRepository(RestaurantContext dbContext)
        {
            _dbContext = dbContext;
        }





        public UserModel? AuthWithEmail(string email)
        {
            UserModel? foundUser = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.Email == email);


            return foundUser;
        }





        public UserModel? AuthWithPhone(string phone)
        {
            UserModel? foundUser = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.PhoneNumber == phone);


            return foundUser;
        }





        public int Create(UserModel user)
        {
            UserModel? foundEmail = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.Email == user.Email);
            UserModel? foundPhone = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);


            if (foundEmail is not null || foundPhone is not null)
                return -1;


            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();


            return user.Id;
        }





        public bool Update(UserModel user)
        {
            _dbContext.Users.Update(user);

            _dbContext.SaveChanges();

            return true;
        }





        public UserModel GetOne(int id)
        {
            return _dbContext.Users.Include(x => x.Orders).FirstOrDefault(x => x.Id == id) ?? new UserModel() { Name = "", Email = "", Password = ""};
        }





        public List<UserModel> GetAll()
        {
            return _dbContext.Users.Include(x => x.Orders).ToList();
        }





        public bool Delete(int id)
        {
            UserModel? foundUser = _dbContext.Users.Include(x => x.Orders).FirstOrDefault(x => x.Id == id);

            if (foundUser is not null)
                _dbContext.Users.Remove(foundUser);

            _dbContext.SaveChanges();



            return true;
        }
    }
}

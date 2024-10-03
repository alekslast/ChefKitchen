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





        public int Create(UserModel user)
        {
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
            return _dbContext.Users.Include(x => x.Orders).FirstOrDefault(x => x.Id == id) ?? new UserModel();
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

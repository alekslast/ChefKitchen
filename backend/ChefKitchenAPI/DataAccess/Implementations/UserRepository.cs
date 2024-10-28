using DataAccess.Errors.UserErrors;
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
            return _dbContext.Users.Include(u => u.Orders).Include(u => u.RefreshTokens).FirstOrDefault(u => u.Email == email) ?? throw new UserNotFoundException();
        }





        public UserModel? AuthWithPhone(string phone)
        {
            return _dbContext.Users.Include(u => u.Orders).Include(u => u.RefreshTokens).FirstOrDefault(u => u.PhoneNumber == phone) ?? throw new UserNotFoundException();
        }





        public int Create(UserModel user)
        {
            UserModel? foundEmail = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.Email == user.Email);
            UserModel? foundPhone = _dbContext.Users.Include(u => u.Orders).FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);


            if (foundEmail is not null)
                throw new EmailExistsException(user.Email);
            else if (foundPhone is not null)
                throw new PhoneExistsException(user.PhoneNumber!);


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
            return _dbContext.Users.Include(x => x.Orders).Include(u => u.RefreshTokens).FirstOrDefault(x => x.Id == id) ?? throw new UserIdNotFoundException(id);
        }





        public List<UserModel> GetAll()
        {
            return _dbContext.Users.Include(x => x.Orders).Include(u => u.RefreshTokens).ToList();
        }





        public bool Delete(int id)
        {
            UserModel foundUser    =   _dbContext.Users.Include(x => x.Orders).FirstOrDefault(x => x.Id == id)
                                            ?? throw new UserIdNotFoundException(id);

            _dbContext.Users.Remove(foundUser);
            _dbContext.SaveChanges();



            return true;
        }
    }
}

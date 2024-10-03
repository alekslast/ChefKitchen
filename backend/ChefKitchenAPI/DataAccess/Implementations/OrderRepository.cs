using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;





namespace DataAccess.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        readonly RestaurantContext _dbContext;



        public OrderRepository(RestaurantContext dbContext)
        {
            _dbContext = dbContext;
        }





        public int Create(OrderModel order)
        {
            _dbContext.Orders.Add(order);

            _dbContext.SaveChanges();

            return order.Id;
        }





        public bool Update(OrderModel order)
        {
            _dbContext.Orders.Update(order);

            _dbContext.SaveChanges();

            return true;
        }





        public OrderModel GetOne(int id)
        {
            return _dbContext.Orders.Include(x => x.MenuItems).Include(x => x.User).FirstOrDefault(x => x.Id == id) ?? new OrderModel();
        }





        public List<OrderModel> GetAll()
        {
            return _dbContext.Orders.Include(x => x.MenuItems).Include(x => x.User).ToList();
        }





        public bool DeleteOne(int id)
        {
            OrderModel? foundOrder = _dbContext.Orders.FirstOrDefault(x => x.Id == id);

            if (foundOrder is not null)
                _dbContext.Orders.Remove(foundOrder);

            _dbContext.SaveChanges();



            return true;
        }




        public bool DeleteAll()
        {
            List<OrderModel> allRecords = _dbContext.Orders.Include(x => x.MenuItems).Include(x => x.User).ToList();

            _dbContext.Orders.RemoveRange(allRecords);

            _dbContext.SaveChanges();



            return true;
        }
    }
}

using DataAccess.Interfaces;
using DataAccess.Models;





namespace DataAccess.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        public OrderRepository()
        {

        }





        public int Create(OrderModel order)
        {
            return order.Id;
        }





        public bool Update(OrderModel order)
        {
            return true;
        }





        public OrderModel GetOne(int id)
        {
            OrderModel order = new();

            return order;
        }





        public List<OrderModel> GetAll()
        {
            List<OrderModel> orderList = new();

            return orderList;
        }





        public bool DeleteOne(int id)
        {
            return true;
        }




        public bool DeleteAll()
        {
            return true;
        }
    }
}

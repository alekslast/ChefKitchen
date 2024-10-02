using DataAccess.Models;

namespace DataAccess.Interfaces
{
    public interface IOrderRepository
    {
        int                 Create      (OrderModel order);
        bool                Update      (OrderModel order);
        OrderModel          GetOne      (int id);
        List<OrderModel>    GetAll      ();
        bool                DeleteOne   (int id);
        bool                DeleteAll   ();
    }
}

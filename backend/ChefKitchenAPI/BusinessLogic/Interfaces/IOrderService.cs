using BusinessLogic.DTOs;
using DataAccess.Models;





namespace BusinessLogic.Interfaces
{
    public interface IOrderService
    {
        int Create(OrderDto order);
        bool Update(OrderDto order);
        OrderDto GetOne(int id);
        List<OrderDto> GetAll();
        bool DeleteOne(int id);
        bool DeleteAll();
    }
}

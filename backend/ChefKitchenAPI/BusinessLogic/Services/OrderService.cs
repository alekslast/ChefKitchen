using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;





namespace BusinessLogic.Services
{
    public class OrderService : IOrderService
    {
        readonly IOrderRepository   _orderRepository;
        readonly IMapper            _mapper;



        public OrderService(
            IOrderRepository        orderRepository,
            IMapper                 mapper
        )
        {
            _orderRepository    =   orderRepository;
            _mapper             =   mapper;
        }





        public int Create(OrderDto orderDto)
        {
            OrderModel order    =   _mapper.Map<OrderModel>(orderDto);
            int newOrderId      =   _orderRepository.Create(order);

            return newOrderId;
        }





        public bool Update(OrderDto orderDto)
        {
            OrderModel order = _mapper.Map<OrderModel>(orderDto);
            bool updateResponse = _orderRepository.Update(order);

            return updateResponse;
        }





        public OrderDto GetOne(int id)
        {
            OrderModel order = _orderRepository.GetOne(id);
            OrderDto orderDto = _mapper.Map<OrderDto>(order);

            return orderDto;
        }





        public List<OrderDto> GetAll()
        {
            List<OrderModel> orderList = _orderRepository.GetAll();
            List<OrderDto> orderListDto = _mapper.Map<List<OrderDto>>(orderList);

            return orderListDto;
        }





        public bool DeleteOne(int id)
        {
            return _orderRepository.DeleteOne(id);
        }





        public bool DeleteAll()
        {
            return _orderRepository.DeleteAll();
        }


    }
}

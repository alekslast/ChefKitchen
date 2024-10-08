using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;





namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        readonly IOrderService  _orderService;
        readonly IMapper        _mapper;

        readonly int            ERROR_CODE = 400;



        public OrdersController(
            IMapper             mapper,
            IOrderService       orderService
        )
        {
            _orderService   =   orderService;
            _mapper         =   mapper;
        }





        [HttpGet]
        public ActionResult<List<Order>> GetAllOrders()
        {
            try
            {
                List<OrderDto> orderDtos    =   _orderService.GetAll();
                List<Order> orders          =   _mapper.Map<List<Order>>(orderDtos);



                return orders;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpGet("{orderId:int}")]
        public ActionResult<Order> GetSingleOrder(int orderId)
        {
            try
            {
                OrderDto foundOrder         =   _orderService.GetOne(orderId);
                Order order                 =   _mapper.Map<Order>(foundOrder);



                return order;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPost]
        public ActionResult CreateOrder([FromBody] Order order)
        {
            try
            {
                OrderDto orederDto          =   _mapper.Map<OrderDto>(order);
                int newOrderId              =   _orderService.Create(orederDto);



                return CreatedAtAction(nameof(GetSingleOrder), new { orderId = newOrderId }, value: newOrderId);
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPatch]
        public ActionResult<string> UpdateOrder([FromBody] Order order)
        {
            try
            {
                OrderDto orderDto           =   _mapper.Map<OrderDto>(order);
                bool response               =   _orderService.Update(orderDto);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }




        [HttpDelete]
        public ActionResult DeleteAllOrders()
        {
            try
            {
                _orderService.DeleteAll();



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpDelete("{orderId:int}")]
        public ActionResult DeleteSingleOrder(int orderId)
        {
            try
            {
                _orderService.DeleteOne(orderId);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }
    }
}

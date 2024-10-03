using DataAccess.Models;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        [HttpGet]
        public string GetAllOrders()
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpGet("{orderId:int}")]
        public string GetSingleOrder(int orderId)
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost]
        public string CreateOrder([FromBody] Order order)
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPatch]
        public string UpdateOrder([FromBody] Order order)
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }




        [HttpDelete]
        public string DeleteAllOrders()
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpDelete("{orderId:int}")]
        public string DeleteSingleOrder(int orderId)
        {
            List<OrderModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }
    }
}

using DataAccess.Models;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;





namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ManuItemsController : ControllerBase
    {
        [HttpGet]
        public string GetMenuItems()
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpGet("{menuItemId:int}")]
        public string GetSingle(int menuItemId)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost]
        public string CreateMenuItem([FromBody] MenuItem menuItem)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPatch]
        public string UpdateMenuItem([FromBody] MenuItem menuItem)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpDelete("{menuItemId:int}")]
        public string DeleteMenuItem(int menuItemId)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }
    }
}

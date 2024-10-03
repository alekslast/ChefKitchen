using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public string GetAllUsers()
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpGet("{userId:int}")]
        public string GetSingleUser(int userId)
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost]
        public string CreateUser([FromBody] User user)
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPatch]
        public string UpdateUser([FromBody] User user)
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpDelete("{userId:int}")]
        public string GetUser(int userId)
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }
    }
}

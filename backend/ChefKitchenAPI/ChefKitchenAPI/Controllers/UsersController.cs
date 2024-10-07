using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly IMapper _mapper;
        readonly IUserService _userService;



        public UsersController(
            IMapper mapper,
            IUserService userService
        )
        {
            _mapper = mapper;
            _userService = userService;
        }





        [HttpGet]
        public List<UserDto> GetAllUsers()
        {
            return _userService.GetAll();
        }





        [HttpGet("{userId:int}")]
        public string GetSingleUser(int userId)
        {
            User menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost]
        //public int CreateUser([FromBody] User user)
        public int CreateUser()
        {
            User newUser        =   new()
            {
                FirstName       =   "Mihai",
                LastName        =   "Vasilean",
                Password        =   "111",
                PhoneNumber     =   "123456789",
                Telegram        =   "misha007",
                Email           =   "user1@gmail.com",
                Country         =   "Moldova",
                City            =   "Chisinau",
                Street          =   "Alba-Iulie 13/1",
                PostalCode      =   "25",
            };

            //string json = JsonConvert.SerializeObject(menuItems);

            UserDto userDto     =   _mapper.Map<UserDto>(newUser);
            int response        =   _userService.Create(userDto);

            return response;
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

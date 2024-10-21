using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using Domain.Models;
using Infrastructure;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;





namespace ChefKitchenAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly IMapper        _mapper;
        readonly IUserService   _userService;
        readonly IInfrastructureServices _infrastructure;

        readonly int            ERROR_CODE = 400;



        public UsersController(
            IMapper             mapper,
            IUserService        userService,
            IInfrastructureServices infrastructure
        )
        {
            _mapper         =   mapper;
            _userService    =   userService;
            _infrastructure =   infrastructure;
        }





        [AllowAnonymous]
        [HttpGet("AuthEmail/{email}")]
        public ActionResult AuthWithEmail(string email)
        {
            try
            {
                UserDto userDto = _userService.AuthWithEmail(email);



                if (userDto is null)
                    return new ContentResult { Content = "User not found", ContentType = "text/plain", StatusCode = 404 };



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [AllowAnonymous]
        [HttpGet("AuthPhone/{phone}")]
        public ActionResult AuthWithPhone(string phone)
        {
            try
            {
                UserDto userDto = _userService.AuthWithPhone(phone);


                if (userDto is null)
                    return new ContentResult { Content = "User not found", ContentType = "text/plain", StatusCode = 404 };



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }




                
        [AllowAnonymous]
        [HttpPost("Login")]
        public ActionResult<string> LoginUser(LoginRequest request)
        {
            try
            {
                UserDto userDto = _infrastructure.Login(request);


                if (userDto is null)
                    return new ContentResult { Content = "User not found", ContentType = "text/plain", StatusCode = 404 };

                string token = _infrastructure.CreateToken(userDto);

                //return Ok();
                return token;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            try
            {
                List<UserDto> foundList     =   _userService.GetAll();
                List<User> users            =   _mapper.Map<List<User>>(foundList);



                return users;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpGet("{userId:int}")]
        public ActionResult<User> GetSingleUser(int userId)
        {
            try
            {
                UserDto foundUser           =   _userService.GetOne(userId);
                User user                   =   _mapper.Map<User>(foundUser);



                return user;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [AllowAnonymous]
        [HttpPost]
        public ActionResult CreateUser()
        {
            try
            {
                User newUser = new()
                {
                    Name = "Mihai Vasilean",
                    Password = "111",
                    PhoneNumber = "+321456789123",
                    Telegram = "misha007",
                    Email = "user2@gmail.com",
                    Country = "UK",
                    City = "London",
                    Street = "Alba-Iulie 13/1",
                    PostalCode = "25",
                };

                UserDto userDto             =   _mapper.Map<UserDto>(newUser);
                int newUserId               =   _infrastructure.CreateNewUser(userDto);



                return CreatedAtAction(nameof(GetSingleUser), new { userId = newUserId }, value: newUserId);
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPatch]
        public ActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                UserDto userDto             =   _mapper.Map<UserDto>(user);
                bool response               =   _userService.Update(userDto);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpDelete("{userId:int}")]
        public ActionResult GetUser(int userId)
        {
            try
            {
                _userService.Delete(userId);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }
    }
}

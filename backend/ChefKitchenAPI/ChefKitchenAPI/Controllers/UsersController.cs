using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using BusinessLogic.Validators;
using DataAccess.Errors.LoginErrors;
using Domain.Models;
//using Infrastructure;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;





namespace ChefKitchenAPI.Controllers
{
	[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly IMapper        _mapper;
        readonly IUserService   _userService;
        readonly IInfrastructureServices _infrastructureServices;

        readonly int            ERROR_CODE = 400;



        public UsersController(
            IMapper             mapper,
            IUserService        userService,
            IInfrastructureServices infrastructureServices
        )
        {
            _mapper         =   mapper;
            _userService    =   userService;
            _infrastructureServices = infrastructureServices;
        }





        [AllowAnonymous]
        [HttpGet("AuthEmail/{email}")]
        public ActionResult AuthWithEmail(string email)
        {
            try
            {
                UserDto userDto = _userService.AuthWithEmail(email);



                if (userDto is null)
                    return new ContentResult { Content = JsonConvert.SerializeObject("User not found"), ContentType = "application/json", StatusCode = 404 };



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
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
                    return new ContentResult { Content = JsonConvert.SerializeObject("User not found"), ContentType = "application/json", StatusCode = 404 };



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            }
        }




        
        [AllowAnonymous]
        [HttpPost("Login")]
        public ActionResult<string> LoginUser(LoginRequest request)
        {
            try
            {
                var validator           =   new LoginValidator();
                var result              =   validator.Validate(request);
                if (!result.IsValid)
                    throw new InvalidLoginException(result.Errors[0].ErrorMessage);



				var (tokenJwt, tokenRefresh) = _userService.Login(request);
                if (string.IsNullOrEmpty(tokenJwt) || tokenRefresh is null)
                    throw new CreateTokenException();



                HttpContext.Response.Cookies.Append(
                    "refreshToken",
                    tokenRefresh.Token,
                    new CookieOptions
                    {
                        HttpOnly        =   true,
                        Secure          =   true,
                        IsEssential     =   true,
                        SameSite        =   SameSiteMode.None,
                        Expires         =   tokenRefresh.Expires
                    }
                );

                HttpContext.Response.Cookies.Append(
                    "token",
                    tokenJwt,
                    new CookieOptions
                    {
                        HttpOnly        =   true,
                        Secure          =   true,
                        IsEssential     =   true,
                        SameSite        =   SameSiteMode.None,
                        Expires         =   DateTime.UtcNow.AddMinutes(2)
                    }
                );



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            }
        }





        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public ActionResult ForgotPassword([FromBody] PasswordRecovery recoveryModel)
        {
            var validator   = new ForgotPasswordValidator();
            var result      = validator.Validate(recoveryModel);
            if (!result.IsValid)
                throw new ForgotPasswordException(result.Errors[0].ErrorMessage);

            var foundEmail  = _userService.AuthWithEmail(recoveryModel.Email);

            
            string subject  = "Password Recovery";
            string body     = "Your code: 45986";


            _infrastructureServices.SendEmail(receiver: recoveryModel.Email, subject: subject, body: body);

			return Ok();
        }






        
        [HttpGet("RefreshToken")]
        public IActionResult RefreshToken()
        {
            string? refreshToken        =   HttpContext.Request.Cookies["refreshToken"];

            if (refreshToken is null || !_infrastructureServices.ValidateRefreshToken(refreshToken))
                return Unauthorized("Invalid or expired refresh token");


            string newToken = _infrastructureServices.RegenerateRefreshToken(refreshToken);

            if (string.IsNullOrEmpty(newToken))
                return Forbid("Token failed");



            return Ok(new { token = newToken });
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
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            }
        }





        [HttpGet("{userId:int}")]
        public ActionResult<User> GetSingleUser(int userId)
        {
            //try
            //{
                UserDto foundUser           =   _userService.GetOne(userId);
                User user                   =   _mapper.Map<User>(foundUser);



                return user;
            //}
            //catch (Exception ex)
            //{
            //    return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            //}
        }





        [AllowAnonymous]
        [HttpPost]
        public ActionResult CreateUser()
        {
            try
            {
                User newUser = new()
                {
					//Name = "Mihai Vasilean",
					//Password = "111",
					//PhoneNumber = "+321456789123",
					//Telegram = "misha007",
					//Email = "user2@gmail.com",
					//Country = "UK",
					//City = "London",
					//Street = "Alba-Iulie 13/1",
					//PostalCode = "25",
					Name = "Lex InHome",
					Password = "M0therF#cker",
					PhoneNumber = "+111456789123",
					Telegram = "notIncluded",
					Email = "lexinhome01@gmail.com",
					Country = "UK",
					City = "London",
					Street = "Alba-Iulie 13/1",
					PostalCode = "25",
				};

                UserDto userDto             =   _mapper.Map<UserDto>(newUser);
                int newUserId               = _userService.CreateNewUser(userDto);



                return CreatedAtAction(nameof(GetSingleUser), new { userId = newUserId }, value: newUserId);
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
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
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            }
        }





        [HttpDelete("{userId:int}")]
        public ActionResult DeleteUser(int userId)
        {
            try
            {
                _userService.Delete(userId);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonConvert.SerializeObject(ex.Message), ContentType = "application/json", StatusCode = ERROR_CODE };
            }
        }
    }
}

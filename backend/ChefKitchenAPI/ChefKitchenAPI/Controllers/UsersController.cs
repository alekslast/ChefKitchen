using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using BusinessLogic.Validators;
using DataAccess.Errors.LoginErrors;
using DataAccess.Errors.UserErrors;
using Domain.Models;
//using Infrastructure;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text;





namespace ChefKitchenAPI.Controllers
{
	[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly IConfiguration             _configuration;
        readonly IMapper                    _mapper;
        readonly IUserService               _userService;
        readonly IInfrastructureServices    _infrastructureServices;

        readonly int                        ERROR_CODE = 400;



        public UsersController(
            IConfiguration                  configuration,
            IMapper                         mapper,
            IUserService                    userService,
            IInfrastructureServices         infrastructureServices
        )
        {
            _configuration              =   configuration;
            _mapper                     =   mapper;
            _userService                =   userService;
            _infrastructureServices     =   infrastructureServices;
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
                        HttpOnly        =   false,
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
        [HttpGet("ForgotPassword/RecoveryCode/{userEmail}")]
        public ActionResult GetRecoveryCode(string userEmail)
        {
            var recoveryModel       =   new UserEmailForRecovery(userEmail);
            var validator           =   new UserEmailValidator();
            var result              =   validator.Validate(recoveryModel);
            if (!result.IsValid)
                throw new ForgotPasswordException(result.Errors[0].ErrorMessage);

            UserDto foundUser       =   _userService.AuthWithEmail(recoveryModel.Email);

            string recoveryCode     =   _infrastructureServices.GenerateResetCode();

            foundUser.RecoveryCode  =   recoveryCode;
            _userService.Update(foundUser);

            HttpContext.Response.Cookies.Append(
                "chefKitchenEmail",
                userEmail,
                new CookieOptions
                {
					HttpOnly = false,
					Secure = true,
					IsEssential = true,
					SameSite = SameSiteMode.None,
					Expires = DateTime.UtcNow.AddMinutes(5)
				}
            );
            
            string subject          =   "Password Recovery";
            string body             =   $"Your code: {recoveryCode}";


            _infrastructureServices.SendEmail(receiver: recoveryModel.Email, subject: subject, body: body);

			return Ok();
        }





        [AllowAnonymous]
        [HttpPost("ForgotPassword/RecoveryCode")]
        public ActionResult CheckRecoveryCode([FromBody] RecoveryCodeModel recoveryCodeModel)
        {
            //var validator           =   new RecoveryCodeValidator();
            //var result              =   validator.Validate(recoveryCodeModel);
            //if (!result.IsValid)
            //	throw new Exception(result.Errors[0].ErrorMessage);

            string formatedEmail = recoveryCodeModel.UserEmail.Replace("%40", "@");

			UserDto foundUser       =   _userService.AuthWithEmail(formatedEmail);
            if (foundUser.RecoveryCode != recoveryCodeModel.RecoveryCode)
				return NotFound("Invalid recovery code");


			HttpContext.Response.Cookies.Append(
				"chefKitchenCode",
				recoveryCodeModel.RecoveryCode,
				new CookieOptions
				{
					HttpOnly = false,
					Secure = true,
					IsEssential = true,
					SameSite = SameSiteMode.None,
					Expires = DateTime.UtcNow.AddMinutes(5)
				}
			);


			//string hashedPassword   =   _infrastructureServices.Hash(passwordRecoveryModel.Password);
			//foundUser.Password      =   hashedPassword;
			//foundUser.RecoveryCode  =   null;

			//_userService.Update(foundUser);


			return Ok();
		}





        [AllowAnonymous]
        [HttpPost("ForgotPassword/ResetPassword")]
        public ActionResult CreateNewPassword([FromBody] PasswordRecoveryModel passwordRecoveryModel)
        {
            //var validator           =   new RecoveryCodeValidator();
            //var result              =   validator.Validate(passwordRecoveryModel);
            //if (!result.IsValid)
            //    throw new Exception(result.Errors[0].ErrorMessage);

            string formatedEmail = passwordRecoveryModel.UserEmail.Replace("%40", "@");




			UserDto foundUser    =   _userService.AuthWithEmail(formatedEmail)!;
			if (foundUser.RecoveryCode != passwordRecoveryModel.RecoveryCode)
				return NotFound("Invalid recovery code");

			string hashedPassword       =   _infrastructureServices.Hash(passwordRecoveryModel.NewPassword);
			foundUser.Password    =   hashedPassword;

            _userService.Update(foundUser);


            return Ok("Password has been successfully recovered");
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





        [HttpGet("GetSingleUser")]
        public ActionResult<UserFEModel> GetSingleUser()
        {
            string wantedUserId         =   string.Empty;
            string accessToken          =   string.Empty;
			var tokenHandler            =   new JwtSecurityTokenHandler();
			byte[] key                  =   Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);


			bool hasToken = HttpContext.Request.Cookies.TryGetValue("token", out accessToken);
			if (!hasToken && string.IsNullOrEmpty(accessToken))
            {
                string authHeader       =   Request.Headers.Authorization.ToString();
                string tokenFromHeaders =   authHeader.Split(" ")[1];
                accessToken             =   tokenFromHeaders;
			}


			var jwtToken                =   new JsonWebTokenHandler().ReadJsonWebToken(accessToken);
			wantedUserId                =   jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
			UserDto foundUser           =   _userService.GetOne(int.Parse(wantedUserId));


            UserFEModel user            =   new()
            {
                Email                   =   foundUser.Email,
                Bonuses                 =   foundUser.Bonuses,
                City                    =   foundUser.City,
                Country                 =   foundUser.Country,
                Name                    =   foundUser.Name,
                Orders                  =   foundUser.Orders,
                PhoneNumber             =   foundUser.PhoneNumber,
                PostalCode              =   foundUser.PostalCode,
                Street                  =   foundUser.Street,
                Telegram                =   foundUser.Telegram,
			};



            return user;
        }





        [AllowAnonymous]
        [HttpPost]
        public ActionResult CreateUser([FromBody] User user)
        {
            try
            {
                //  User newUser        =   new()
                //  {
				//	Name            =   "Lex InHome",
				//	Password        =   "M0therF#cker1",
				//	PhoneNumber     =   "+111456789123",
				//	Telegram        =   "notIncluded",
				//	Email           =   "lexinhome01@gmail.com",
				//	Country         =   "UK",
				//	City            =   "London",
				//	Street          =   "Alba-Iulie 13/1",
				//	PostalCode      =   "25",
				//};

                UserDto userDto     =   _mapper.Map<UserDto>(user);
                int newUserId       =   _userService.CreateNewUser(userDto);



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
                UserDto userDto     =   _mapper.Map<UserDto>(user);
                bool response       =   _userService.Update(userDto);


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

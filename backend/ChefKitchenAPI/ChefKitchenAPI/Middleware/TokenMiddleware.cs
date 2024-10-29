using AutoMapper;
using BusinessLogic.DTOs;
using DataAccess.Interfaces;
using Infrastructure.Interfaces;





namespace ChefKitchenAPI.Middleware
{
    public class TokenMiddleware
    {
        readonly RequestDelegate    _next;
        readonly IMapper            _mapper;



        public TokenMiddleware(
            RequestDelegate         next,
            IMapper                 mapper
        )
        {
            _next               =   next;
            _mapper             =   mapper;
        }





        public async Task Invoke(HttpContext context, IInfrastructureRepository infrastructureRepo, IInfrastructureServices infrastructure)
        {
            string? jwtToken        =   context.Request.Cookies["token"];
            string? refreshToken    =   context.Request.Cookies["refreshToken"];
            var recievedUrl         =   context.Request.Path;
            string loginUrl         =   "/Users/Login";

            if (recievedUrl == loginUrl)
            {
                await _next(context);
                return;
            }

            if (string.IsNullOrEmpty(jwtToken) || infrastructure.ValidateJwtToken(jwtToken))
            {
                if (!string.IsNullOrEmpty(refreshToken))
                {
                    var foundToken = infrastructureRepo.GetToken(refreshToken);

                    if (foundToken.User is not null)
                    {
                        UserDto userDto         =   _mapper.Map<UserDto>(foundToken.User);
                        var newJwtToken         =   infrastructure.CreateJwtToken(userDto);

                        context.Response.Cookies.Append(
                            "token",
                            newJwtToken,
                            new CookieOptions
                            {
                                HttpOnly        =   true,
                                Secure          =   true,
                                IsEssential     =   true,
                                SameSite        =   SameSiteMode.None,
                                Expires         =   DateTime.UtcNow.AddMinutes(2)
                            }
                        );


                        context.Request.Headers.Add("Authorization", $"Bearer {newJwtToken}");


                        await _next(context);
                        return;
                    }
                }


                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            await _next(context);
        }
    }
}

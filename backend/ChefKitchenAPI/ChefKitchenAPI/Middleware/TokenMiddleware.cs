using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Interfaces;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;





namespace ChefKitchenAPI.Middleware
{
    public class TokenMiddleware
    {
        readonly RequestDelegate _next;
        readonly IMapper _mapper;



        public TokenMiddleware(
            RequestDelegate next,
            IMapper mapper
        )
        {
            _next = next;
            _mapper = mapper;
        }





        public async Task Invoke(HttpContext context, IInfrastructureRepository infrastructureRepo, IInfrastructureServices infrastructure)
        {
            string? jwtToken = context.Request.Cookies["token"];
            string? refreshToken = context.Request.Cookies["refreshToken"];
            var recievedUrl = context.Request.Path;
            string loginUrl = "/Users/Login";
            //var x = url.Target;

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

                    if (foundToken.User is null)
                    {
                        UserDto userDto = _mapper.Map<UserDto>(foundToken.User);
                        var newJwtToken = infrastructure.CreateToken(userDto);
                        context.Response.Cookies.Append(
                            "token",
                            newJwtToken,
                            new CookieOptions
                            {
                                HttpOnly = true,
                                Secure = true,
                                IsEssential = true,
                                SameSite = SameSiteMode.None,
                                Expires = DateTime.UtcNow.AddMinutes(2)
                            }
                        );
                        //context.Response.WriteAsync(JsonConvert.SerializeObject(newJwtToken));


                        // Продолжаем обработку запроса с новым JWT токеном
                        await _next(context);
                        return;
                    }
                }

                //context.Response.Redirect("/tokenTest");

                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            // Если JWT токен валиден, продолжаем обработку запроса
            await _next(context);
        }
    }
}

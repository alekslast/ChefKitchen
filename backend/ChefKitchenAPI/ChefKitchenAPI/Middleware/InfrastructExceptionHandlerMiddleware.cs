using ChefKitchenAPI.Abstractions;
using DataAccess.Errors.MenuErrors;
using Infrastructure.InfrastructErrors;
using Newtonsoft.Json;
using System.Net;

namespace ChefKitchenAPI.Middleware
{
    public class InfrastructExceptionHandlerMiddleware : AbstractExceptionHandlerMiddleware
    {
        public InfrastructExceptionHandlerMiddleware(RequestDelegate next) : base(next)
        {
        }

        public override (HttpStatusCode code, string message) GetResponse(Exception exception)
        {
            HttpStatusCode code;
            switch (exception)
            {
                case TokenRefreshException:
                    code = HttpStatusCode.Inte;
                    break;
                case WrongPasswordException:
                    code = HttpStatusCode.NotFound;
                    break;
                default:
                    code = HttpStatusCode.InternalServerError;
                    break;
            }

            return (code, JsonConvert.SerializeObject(exception.Message));
        }
    }
}

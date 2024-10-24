using ChefKitchenAPI.Abstractions;
using DataAccess.Errors.MenuErrors;
using Newtonsoft.Json;
using System.Net;

namespace ChefKitchenAPI.Middleware
{
    public class MenuExceptionHandlerMiddleware : AbstractExceptionHandlerMiddleware
    {
        public MenuExceptionHandlerMiddleware(RequestDelegate next) : base(next)
        {
        }

        public override (HttpStatusCode code, string message) GetResponse(Exception exception)
        {
            HttpStatusCode code;
            switch(exception)
            {
                case MenuNotFoundException:
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

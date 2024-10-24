using ChefKitchenAPI.Abstractions;
using DataAccess.Errors.OrderErrors;
using Newtonsoft.Json;
using System.Net;

namespace ChefKitchenAPI.Middleware
{
    public class OrderExceptionHandlerMiddleware : AbstractExceptionHandlerMiddleware
    {
        public OrderExceptionHandlerMiddleware(RequestDelegate next) : base(next)
        {
        }

        public override (HttpStatusCode code, string message) GetResponse(Exception exception)
        {
            HttpStatusCode code;
            switch(exception)
            {
                case OrderNotFoundException:
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

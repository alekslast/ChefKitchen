using ChefKitchenAPI.Abstractions;
using DataAccess.Errors.UserErrors;
using Newtonsoft.Json;
using System.Net;

namespace ChefKitchenAPI.Middleware
{
    public class UserExceptionHandlerMiddleware : AbstractExceptionHandlerMiddleware
    {
        public UserExceptionHandlerMiddleware(RequestDelegate next) : base(next)
        {
        }

        public override (HttpStatusCode code, string message) GetResponse(Exception exception)
        {
            HttpStatusCode code;
            switch (exception)
            {
                case KeyNotFoundException
                    or UserNotFoundException:
                    code = HttpStatusCode.NotFound;
                    break;
                //case EntityAlreadyExists:
                //    code = HttpStatusCode.Conflict;
                //    break;
                //case UnauthorizedAccessException
                //    or ExpiredPasswordException
                //    or UserBlockedException:
                //    code = HttpStatusCode.Unauthorized;
                //    break;
                //case CreateUserException
                //    or ResetPasswordException
                //    or ArgumentException
                //    or InvalidOperationException:
                //    code = HttpStatusCode.BadRequest;
                //    break;
                default:
                    code = HttpStatusCode.InternalServerError;
                    break;
            }
            return (code, JsonConvert.SerializeObject(exception.Message));
        }
    }
}

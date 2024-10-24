﻿using NLog;
using System.Net;





namespace ChefKitchenAPI.Abstractions
{
    /// <summary>
    /// Abstract handler for all exceptions.
    /// </summary>
    public abstract class AbstractExceptionHandlerMiddleware
    {
        // Enrich is a custom extension method that enriches the Serilog functionality - you may ignore it
        //private static readonly ILogger Logger = Log.ForContext(MethodBase.GetCurrentMethod()?.DeclaringType).Enrich();
        Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// This key should be used to store the exception in the <see cref="IDictionary{TKey,TValue}"/> of the exception data,
        /// to be localized in the abstract handler.
        /// </summary>
        public static string LocalizationKey => "LocalizationKey";

        private readonly RequestDelegate _next;

        /// <summary>
        /// Gets HTTP status code response and message to be returned to the caller.
        /// Use the ".Data" property to set the key of the messages if it's localized.
        /// </summary>
        /// <param name="exception">The actual exception</param>
        /// <returns>Tuple of HTTP status code and a message</returns>
        public abstract (HttpStatusCode code, string message) GetResponse(Exception exception);

        public AbstractExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                _logger.Error(exception, "error during executing {Context}", context.Request.Path.Value);
                var response            =   context.Response;
                response.ContentType    =   "application/json";

                var (status, message)   =   GetResponse(exception);
                response.StatusCode     =   (int)status;

                await response.WriteAsync(message);
            }
        }
    }
}

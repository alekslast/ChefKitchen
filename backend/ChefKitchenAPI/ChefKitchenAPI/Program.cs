using BusinessLogic.Interfaces;
using BusinessLogic.Services;
using ChefKitchenAPI.Abstractions;
using ChefKitchenAPI.Middleware;
using DataAccess;
using DataAccess.Implementations;
using DataAccess.Interfaces;
using Domain;
using Infrastructure.Implementations;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;
using System;
using System.Text;





var appBasePath = Directory.GetCurrentDirectory();
GlobalDiagnosticsContext.Set("appbasepath", appBasePath);
var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();


try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            builder =>
            {
                builder.WithOrigins("http://localhost:5173")
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            });
    });


    builder.Services.AddDbContext<RestaurantContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


    builder.Services.AddControllers();



    builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

    builder.Services.AddAuthorization(options =>
    {
        options.DefaultPolicy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
    });

    //builder.Services.AddAuthentication();
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
        .AddJwtBearer(o =>
        {
            o.RequireHttpsMetadata = false;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),

                ValidateIssuer = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],

                ValidateAudience = true,
                ValidAudience = builder.Configuration["Jwt:Audience"],

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            o.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    context.Request.Cookies.TryGetValue("token", out var accessToken);
                    if (!string.IsNullOrEmpty(accessToken))
                        context.Token = accessToken;

                    return Task.CompletedTask;
                }


                //OnAuthenticationFailed = async context =>
                //{
                //    if (context.Exception is SecurityTokenExpiredException)
                //    {
                //        logger.Info("Token expired. Generating new token.");


                //        string? refreshToken = context.HttpContext.Request.Cookies["refreshToken"];

                //        if (string.IsNullOrEmpty(refreshToken))
                //        {
                //            logger.Error("Refresh token is missing");

                //            context.Response.Redirect("/tokenTest");

                //            return;
                //        }

                //        var tokenService = context.HttpContext.RequestServices.GetRequiredService<IInfrastructureServices>();
                //        string newTokenJwt = tokenService.RefreshToken(refreshToken);

                //        context.Response.Headers.Add("Authorization", $"Bearer {newTokenJwt}");
                //        context.Response.StatusCode = StatusCodes.Status200OK;
                //        context.Response.ContentType = "application/json";
                //        await context.Response.WriteAsync(newTokenJwt);

                //        logger.Info("New token generated and sent to the client.");
                //    }
                //    else
                //    {
                //        logger.Error("Authentication failed: " + context.Exception.Message);

                //        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                //        context.Response.ContentType = "application/json";
                //        await context.Response.WriteAsync("Invalid token");
                //    }

                //},
                //OnTokenValidated = context =>
                //{
                //    logger.Info("Token validated: " + context.SecurityToken);
                //    return Task.CompletedTask;
                //}
            };
        });



    //builder.Services.AddTransient<ExceptionHandlingMiddleware>();
    builder.Services.AddScoped<IInfrastructureServices,     InfrastructureServices>();
    builder.Services.AddScoped<IInfrastructureRepository,   InfrastructureRepository>();
    builder.Services.AddScoped<IUserRepository,             UserRepository>();
    builder.Services.AddScoped<IOrderRepository,            OrderRepository>();
    builder.Services.AddScoped<IMenuItemRepository,         MenuItemRepository>();
    builder.Services.AddScoped<IMenuItemService,            MenuItemService>();
    builder.Services.AddScoped<IOrderService,               OrderService>();
    builder.Services.AddScoped<IUserService,                UserService>();



    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "ChefKitchen API",
            Description = "Key endpoints to address while working with ChefKitchen",
        });
        // var xmlFileName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        // options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFileName));
    });

    var app = builder.Build();

    // CORS usage
    app.UseCors("AllowReactApp");


    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.RoutePrefix = string.Empty;
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        });
    }

    app.UseMiddleware<TokenMiddleware>();
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<UserExceptionHandlerMiddleware>();
    app.MapControllers();



    app.Run();

}
catch(Exception exception)
{
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    LogManager.Shutdown();
}
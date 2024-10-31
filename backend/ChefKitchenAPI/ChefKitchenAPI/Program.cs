using BusinessLogic.Interfaces;
using BusinessLogic.Services;
using ChefKitchenAPI.Middleware;
using DataAccess;
using DataAccess.Implementations;
using DataAccess.Interfaces;
using Domain;
using FluentValidation;
using Infrastructure.Implementations;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;
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
                builder.WithOrigins("https://localhost:3001")
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
                ClockSkew = TimeSpan.FromMinutes(2)
            };
            o.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    context.Request.Cookies.TryGetValue("token", out var accessToken);
                    if (!string.IsNullOrEmpty(accessToken))
                        context.Token = accessToken;
                    else if (context.Request.Headers.TryGetValue("Authorization", out var authHeader))
                        context.Token = authHeader.ToString().Replace("Bearer ", "");

                    return Task.CompletedTask;
                },
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine("Authentication failed: " + context.Exception.Message);
                    return Task.CompletedTask;
                }
            };
        });

    //builder.Services.AddValidatorsFromAssemblyContaining<UserValidator>();
    ////Added fluent validation
    //builder.Services.AddControllers().AddFluentValidation(options =>
    //{
    //    // Automatic registration of validators in assembly
    //    //options.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
    //    options.RegisterValidatorsFromAssemblyContaining<Program>();
    //    options.LocalizationEnabled = true;
    //});


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
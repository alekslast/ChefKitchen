using BusinessLogic.Interfaces;
using BusinessLogic.Services;
using DataAccess;
using DataAccess.Implementations;
using DataAccess.Interfaces;
using Domain;
using Infrastructure.Implementations;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;





var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


builder.Services.AddDbContext<RestaurantContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();



builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

//builder.Services.AddSingleton<IPasswordHasher,      PasswordHasher>();
//builder.Services.AddSingleton<ITokenProvider,       TokenProvider>();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata  =   false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey    =   new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidIssuer         =   builder.Configuration["Jwt:Issuer"],
            ValidAudience       =   builder.Configuration["Jwt:Audience"],
            ClockSkew           =   TimeSpan.Zero
        };
    });

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

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();



app.Run();

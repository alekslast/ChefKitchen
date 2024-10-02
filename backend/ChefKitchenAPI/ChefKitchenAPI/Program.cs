using DataAccess;
using DataAccess.Implementations;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;





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



builder.Services.AddScoped<IUserRepository,         UserRepository>();
builder.Services.AddScoped<IOrderRepository,        OrderRepository>();
builder.Services.AddScoped<IMenuItemRepository,     MenuItemRepository>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// CORS usage
app.UseCors("AllowReactApp");


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();



app.Run();

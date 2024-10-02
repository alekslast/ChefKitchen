using DataAccess.Models;
using Microsoft.EntityFrameworkCore;





namespace DataAccess
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions<RestaurantContext> contextOptions) : base(contextOptions)
        {

        }

        public DbSet<MenuItemModel>     MenuItems       { get; set; }
        public DbSet<OrderModel>        Orders          { get; set; }
        public DbSet<UserModel>         Users           { get; set; }
    }
}

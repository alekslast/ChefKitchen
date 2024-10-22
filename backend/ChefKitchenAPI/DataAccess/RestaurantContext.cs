using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;





namespace DataAccess
{
    public class RestaurantContext : DbContext
    {
        private readonly IConfiguration _configuration;



        public RestaurantContext(DbContextOptions<RestaurantContext> contextOptions, IConfiguration configuration)
            : base(contextOptions)
        {
            _configuration = configuration;
        }



        public DbSet<MenuItemModel> MenuItems { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<RefreshTokenModel> RefreshTokens { get; set; } 





        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
            }
        }





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<MenuItemModel>()
                .HasKey(o => o.Id);

            modelBuilder.Entity<OrderModel>()
                .HasMany(o => o.MenuItems)
                .WithOne(mi => mi.Order)
                .HasForeignKey(mi => mi.OrderId);

            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.RefreshTokens)
                .WithOne(refreshToken => refreshToken.User)
                .HasForeignKey(refreshToken => refreshToken.UserId);

            modelBuilder.Entity<RefreshTokenModel>()
                .Property(e => e.Expires)
                .HasColumnType("timestamp without time zone");

            modelBuilder.Entity<RefreshTokenModel>()
                .Property(e => e.Created)
                .HasColumnType("timestamp without time zone");
        }
    }
}

using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;





namespace DataAccess.Implementations
{
    public class MenuItemRepository : IMenuItemRepository
    {
        readonly RestaurantContext _dbContext;



        public MenuItemRepository(RestaurantContext dbContext)
        {
            _dbContext = dbContext; 
        }





        public int Create(MenuItemModel menuItem)
        {
            _dbContext.MenuItems.Add(menuItem);

            _dbContext.SaveChanges();

            return menuItem.Id;
        }





        public bool CreateMultiple(List<MenuItemModel> menuItems)
        {
            int length0     =   _dbContext.MenuItems.ToList().Count;

            _dbContext.MenuItems.AddRange(menuItems);

            _dbContext.SaveChanges();

            int length1     =   _dbContext.MenuItems.ToList().Count;
            int length      =   length0 - length1;

            return length < 0;
        }





        public bool Update(MenuItemModel menuItem)
        {
            _dbContext.MenuItems.Update(menuItem);

            _dbContext.SaveChanges();

            return true;
        }





        public MenuItemModel GetOne(int id)
        {
            return _dbContext.MenuItems.Find(id) ?? new MenuItemModel();
        }





        public List<MenuItemModel> GetAll()
        {
            return _dbContext.MenuItems.Include(x => x.Order).ToList();
        }





        public bool DeleteOne(int id)
        {
            MenuItemModel? foundItem = _dbContext.MenuItems.FirstOrDefault(x => x.Id == id);

            if (foundItem is not null)
                _dbContext.MenuItems.Remove(foundItem);


            _dbContext.SaveChanges();



            return true;
        }

    }
}

using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Implementations
{
    public class MenuItemRepository : IMenuItemRepository
    {
        public MenuItemRepository()
        {

        }





        public int Create(MenuItemModel menuItem)
        {
            return menuItem.Id;
        }





        public bool Update(MenuItemModel menuItem)
        {
            return true;
        }





        public MenuItemModel GetOne(int id)
        {
            MenuItemModel menuItem = new();

            return menuItem;
        }





        public List<MenuItemModel> GetAll()
        {
            List<MenuItemModel> menuItemList = new();

            return menuItemList;
        }





        public bool DeleteOne(int id)
        {
            return true;
        }

    }
}

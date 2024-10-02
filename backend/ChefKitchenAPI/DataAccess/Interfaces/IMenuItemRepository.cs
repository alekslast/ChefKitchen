using DataAccess.Models;

namespace DataAccess.Interfaces
{
    public interface IMenuItemRepository
    {
        int                     Create      (MenuItemModel menuItem);
        bool                    Update      (MenuItemModel menuItem);
        MenuItemModel           GetOne      (int id);
        List<MenuItemModel>     GetAll      ();
        bool                    DeleteOne   (int id);
    }
}

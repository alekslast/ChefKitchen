using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Interfaces
{
    public interface IMenuItemRepository
    {
        int                     Create          (MenuItemModel menuItem);
        bool                    CreateMultiple  (List<MenuItemModel> menuItems);
        bool                    Update          (MenuItemModel menuItem);
        MenuItemModel           GetOne          (int id);
        List<MenuItemModel>     GetAll          ();
        bool                    DeleteOne       (int id);
    }
}

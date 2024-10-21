using BusinessLogic.DTOs;
using DataAccess.Models;





namespace BusinessLogic.Interfaces
{
    public interface IMenuItemService
    {
        int                 Create          (MenuItemDto menuItem);
        bool                CreateMultiple  (List<MenuItemDto> menuItems);
        bool                Update          (MenuItemDto menuItem);
        MenuItemDto         GetOne          (int id);
        List<MenuItemDto>   GetAll          ();
        bool                DeleteOne       (int id);
    }
}

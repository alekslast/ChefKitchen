using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;





namespace BusinessLogic.Services
{
    public class MenuItemService : IMenuItemService
    {
        readonly IMenuItemRepository    _menuItemRepository;
        readonly IMapper                _mapper;



        public MenuItemService(
            IMenuItemRepository         menuItemRepository,
            IMapper                     mapper
        )
        {
            _menuItemRepository     =   menuItemRepository;
            _mapper                 =   mapper;
        }





        public int Create(MenuItemDto menuItemDto)
        {
            MenuItemModel menuItem  =   _mapper.Map<MenuItemModel>(menuItemDto);
            int newItemId           =   _menuItemRepository.Create(menuItem);

            return newItemId;
        }





        public bool Update(MenuItemDto menuItemDto)
        {
            MenuItemModel menuItem  =   _mapper.Map<MenuItemModel>(menuItemDto);
            bool updateResponse     =   _menuItemRepository.Update(menuItem);

            return updateResponse;
        }





        public MenuItemDto GetOne(int id)
        {
            MenuItemModel menuItem = _menuItemRepository.GetOne(id);
            MenuItemDto menuItemDto = _mapper.Map<MenuItemDto>(menuItem);

            return menuItemDto;
        }





        public List<MenuItemDto> GetAll()
        {
            List<MenuItemModel> allMenuItems = _menuItemRepository.GetAll();
            List<MenuItemDto> allMenuItemsDto = _mapper.Map<List<MenuItemDto>>(allMenuItems);

            return allMenuItemsDto;
        }





        public bool DeleteOne(int id)
        {
            return _menuItemRepository.DeleteOne(id);
        }


    }
}

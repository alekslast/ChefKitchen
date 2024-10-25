using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;





namespace ChefKitchenAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MenuItemsController : ControllerBase
    {
        readonly IMapper            _mapper;
        readonly IMenuItemService   _menuItemService;

        readonly int                ERROR_CODE = 400;



        public MenuItemsController(
            IMapper                 mapper,
            IMenuItemService        menuItemService
        )
        {
            _mapper             =   mapper;
            _menuItemService    =   menuItemService;
        }





        
        [HttpGet]
        public ActionResult<List<MenuItem>> GetMenuItems()
        {
            try
            {
                List<MenuItemDto> menuItemsDtos =   _menuItemService.GetAll();
                List<MenuItem> menuItems        =   _mapper.Map<List<MenuItem>>(menuItemsDtos);



                return menuItems;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpGet("{menuItemId:int}")]
        public ActionResult<MenuItem> GetSingle(int menuItemId)
        {
            try
            {
                MenuItemDto response            =   _menuItemService.GetOne(menuItemId);
                MenuItem menuItem               =   _mapper.Map<MenuItem>(response);



                return menuItem;
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPost("Single")]
        public ActionResult CreateMenuItem([FromBody] MenuItem menuItem)
        {
            try
            {
                MenuItemDto menuItemDto         =   _mapper.Map<MenuItemDto>(menuItem);
                int newMenuItemId               =   _menuItemService.Create(menuItemDto);



                return CreatedAtAction(nameof(GetSingle), new { menuItemId = newMenuItemId }, value: newMenuItemId);
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPost("Multiple")]
        public ActionResult<bool> CreateMultipleMenuItems([FromBody] List<MenuItem> menuItemDtos)
        {
            try
            {
                //List<MenuItemModel> menuItems = new()
                //{
                //    new MenuItemModel() {
                //        MealType = "BREAKFAST 1",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //    new MenuItemModel() {
                //        MealType = "BREAKFAST 2",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //    new MenuItemModel() {
                //        MealType = "LUNCH",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //    new MenuItemModel() {
                //        MealType = "SNACK",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //    new MenuItemModel() {
                //        MealType = "DINNER 2",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //    new MenuItemModel() {
                //        MealType = "DINNER 2",
                //        MealName = "Chicken fricassee with mushrooms and bulgur",
                //        Protein = 15,
                //        Fats = 7,
                //        Carbs = 24,
                //        Energy = 285,
                //        TotalWeight = 345
                //    },
                //};


                List<MenuItemDto> menuItemsDto  =   _mapper.Map<List<MenuItemDto>>(menuItemDtos);
                bool response                   =   _menuItemService.CreateMultiple(menuItemsDto);



                return CreatedAtAction(nameof(GetMenuItems), value: _menuItemService.GetAll());
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpPatch]
        public ActionResult UpdateMenuItem([FromBody] MenuItem menuItem)
        {
            try
            {
                MenuItemDto menuItemDto         =   _mapper.Map<MenuItemDto>(menuItem);
                bool response                   =   _menuItemService.Update(menuItemDto);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }





        [HttpDelete("{menuItemId:int}")]
        public ActionResult DeleteMenuItem(int menuItemId)
        {
            try
            {
                _menuItemService.DeleteOne(menuItemId);



                return Ok();
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = ex.Message, ContentType = "text/plain", StatusCode = ERROR_CODE };
            }
        }
    }
}

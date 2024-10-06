using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Models;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;





namespace ChefKitchenAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ManuItemsController : ControllerBase
    {
        readonly IMapper            _mapper;
        readonly IMenuItemService   _menuItemService;



        public ManuItemsController(
            IMapper                 mapper,
            IMenuItemService        menuItemService
        )
        {
            _mapper             =   mapper;
            _menuItemService    =   menuItemService;
        }





        [HttpGet]
        public string GetMenuItems()
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpGet("{menuItemId:int}")]
        public string GetSingle(int menuItemId)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost("Single")]
        public string CreateMenuItem([FromBody] MenuItem menuItem)
        {
            List<MenuItemModel> menuItems = new() { };

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpPost("Multiple")]
        // [FromBody] List<MenuItemModel> menuItems1
        public bool CreateMultipleMenuItems()
        {
            List<MenuItemModel> menuItems = new()
            {
                new MenuItemModel() {
                    MealType = "BREAKFAST 1",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
                new MenuItemModel() {
                    MealType = "BREAKFAST 2",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
                new MenuItemModel() {
                    MealType = "LUNCH",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
                new MenuItemModel() {
                    MealType = "SNACK",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
                new MenuItemModel() {
                    MealType = "DINNER 2",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
                new MenuItemModel() {
                    MealType = "DINNER 2",
                    MealName = "Chicken fricassee with mushrooms and bulgur",
                    Protein = 15,
                    Fats = 7,
                    Carbs = 24,
                    Energy = 285,
                    TotalWeight = 345
                },
            };


            List<MenuItemDto> menuItemsDto  =   _mapper.Map<List<MenuItemDto>>(menuItems);
            bool response                   =   _menuItemService.CreateMultiple(menuItemsDto);



            return response;
        }





        [HttpPatch]
        public string UpdateMenuItem([FromBody] MenuItem menuItem)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }





        [HttpDelete("{menuItemId:int}")]
        public string DeleteMenuItem(int menuItemId)
        {
            List<MenuItemModel> menuItems = new();

            string json = JsonConvert.SerializeObject(menuItems);

            return json;
        }
    }
}

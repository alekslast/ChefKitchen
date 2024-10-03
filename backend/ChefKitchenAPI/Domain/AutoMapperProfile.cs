using AutoMapper;
using BusinessLogic.DTOs;
using DA = DataAccess.Models;
using Domain.Models;





namespace Domain
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // UI <-> DTO
            CreateMap<MenuItem,         MenuItemDto>().ReverseMap();
            CreateMap<Order,            OrderDto>().ReverseMap();
            CreateMap<User,        UserDto>().ReverseMap();

            // DTO <-> DataAccess
            CreateMap<DA.MenuItemModel, MenuItemDto>().ReverseMap();
            CreateMap<DA.OrderModel,    OrderDto>().ReverseMap();
            CreateMap<DA.UserModel,     UserDto>().ReverseMap();
        }
    }
}

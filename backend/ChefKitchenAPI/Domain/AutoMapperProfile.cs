using AutoMapper;
using DA = DataAccess.Models;
using Domain.Models;
using BusinessLogic.DTOs;





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

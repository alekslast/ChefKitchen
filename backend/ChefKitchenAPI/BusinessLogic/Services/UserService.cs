using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;





namespace BusinessLogic.Services
{
    public class UserService : IUserService
    {
        readonly IUserRepository            _userRepository;
        readonly IMapper                    _mapper;



        public UserService(
            IUserRepository                 userRepository,
            IMapper                         mapper
        )
        {
            _userRepository             =   userRepository;
            _mapper                     =   mapper;
        }





        public int Create(UserDto userDto)
        {
            UserModel user              =   _mapper.Map<UserModel>(userDto);
            int newUserId               =   _userRepository.Create(user);

            return newUserId;
        }





        public bool Update(UserDto userDto)
        {
            UserModel user              =   _mapper.Map<UserModel>(userDto);

            return _userRepository.Update(user);
        }





        public UserDto GetOne(int id)
        {
            UserModel foundUser         =   _userRepository.GetOne(id);
            UserDto user                =   _mapper.Map<UserDto>(foundUser);

            return user;
        }





        public List<UserDto> GetAll()
        {
            List<UserModel> userList    =   _userRepository.GetAll();
            List<UserDto> userListDto   =   _mapper.Map<List<UserDto>>(userList); ;

            return userListDto;
        }





        public bool Delete(int id)
        {
            return _userRepository.Delete(id);
        }

    }
}

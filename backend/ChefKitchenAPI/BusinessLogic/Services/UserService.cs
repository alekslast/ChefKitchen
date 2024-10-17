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
        readonly IPasswordHasher            _passwordHasher;



        public UserService(
            IUserRepository                 userRepository,
            IMapper                         mapper,
            IPasswordHasher                 passwordHasher
        )
        {
            _userRepository             =   userRepository;
            _mapper                     =   mapper;
            _passwordHasher             =   passwordHasher;
        }





        public UserDto? AuthWithEmail(string email)
        {
            UserModel? foundUser        =   _userRepository.AuthWithEmail(email);

            if (foundUser is null)
                return null;



            UserDto user                =   _mapper.Map<UserDto>(foundUser);



            return user;
        }





        public UserDto? AuthWithPhone(string phone)
        {
            UserModel? foundUser = _userRepository.AuthWithPhone(phone);

            if (foundUser is null)
                return null;



            UserDto user = _mapper.Map<UserDto>(foundUser);



            return user;
        }




        public record LoginRequest(string Email, string Password);
        public UserDto Login(LoginRequest loginRequest)
        {
            UserModel? foundUser = _userRepository.AuthWithEmail(loginRequest.Email);

            if (foundUser is null)
            {
                throw new Exception("User not found");
            }

            bool verified = _passwordHasher.Verify(loginRequest.Password, foundUser.Password);

            if (!verified)
            {
                throw new Exception("Incorrect password");
            }

            return _mapper.Map<UserDto>(foundUser);
        }





        public int Create(UserDto userDto)
        {
            userDto.Password            =   _passwordHasher.Hash(userDto.Password);
            
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

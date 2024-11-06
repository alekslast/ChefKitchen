using AutoMapper;
using BusinessLogic.BusinessErrors;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using DataAccess.Errors.UserErrors;
using DataAccess.Interfaces;
using DataAccess.Models;
using Infrastructure.Interfaces;





namespace BusinessLogic.Services
{
    public class UserService : IUserService
    {
        readonly IInfrastructureServices    _infrastuctServices;
        readonly IUserRepository            _userRepository;
        readonly IMapper                    _mapper;



        public UserService(
            IInfrastructureServices         infrastuctServices,
            IUserRepository                 userRepository,
            IMapper                         mapper
        )
        {
            _infrastuctServices         =   infrastuctServices;
            _userRepository             =   userRepository;
            _mapper                     =   mapper;
        }





        public UserDto? AuthWithEmail(string email)
        {
            UserModel? foundUser        =   _userRepository.AuthWithEmail(email);
            UserDto user                =   _mapper.Map<UserDto>(foundUser);


            return user;
        }





        public UserDto? AuthWithPhone(string phone)
        {
            UserModel? foundUser        =   _userRepository.AuthWithPhone(phone);
            UserDto user                =   _mapper.Map<UserDto>(foundUser);


            return user;
        }





        public UserDto CheckRecoveryCode(string recoveryCode)
        {
            List<UserModel>? allUsers   =   _userRepository.GetAll();
            UserModel? foundUser        =   allUsers.FirstOrDefault(x => x.RecoveryCode == recoveryCode)
                                            ?? throw new UserNotFoundException();

            UserDto convertedUser       =   _mapper.Map<UserDto>(foundUser);


            return convertedUser;
		}





        public (string tokenJwt, RefreshTokenModel? tokenRefresh) Login(LoginRequest loginRequest)
        {
            string tokenJwt                     =   string.Empty;
            RefreshTokenModel? tokenRefresh     =   null;
            
            // There is an exeption handler inside of this method
            UserModel foundUser = _userRepository.AuthWithEmail(loginRequest.Email)!;


            bool verified = _infrastuctServices.VerifyPasswordAgainstHash(loginRequest.Password, foundUser.Password);
            if (!verified)
                throw new WrongPasswordException();


            //UserDto mappedUser = _mapper.Map<UserDto>(foundUser);
            tokenJwt = _infrastuctServices.CreateJwtToken(foundUser);


            RefreshTokenModel? lastToken = foundUser.RefreshTokens.LastOrDefault();
            if (lastToken is not null && lastToken.Expires > DateTime.Now)
                return (tokenJwt, lastToken);


            tokenRefresh = _infrastuctServices.GenerateRefreshToken();
            foundUser.RefreshTokens.Add(tokenRefresh);


            bool response = _userRepository.Update(foundUser);
            if (!response)
                throw new TokenRefreshException();



            return (tokenJwt, tokenRefresh);

        }





        public int CreateNewUser(UserDto userDto)
        {
            userDto.Password = _infrastuctServices.Hash(userDto.Password);

            UserModel user = _mapper.Map<UserModel>(userDto);
            int newUserId = _userRepository.Create(user);

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





        //public UserDto GetUserByRefreshToken(string refreshToken)
        //{
        //    var foundUser = _userRepository.
        //    return;
        //}
    }
}

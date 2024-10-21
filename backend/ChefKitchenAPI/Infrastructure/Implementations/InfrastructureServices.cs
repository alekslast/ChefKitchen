using AutoMapper;
using BusinessLogic.DTOs;
using DataAccess.Interfaces;
using DataAccess.Models;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;





namespace Infrastructure.Implementations
{
    public class InfrastructureServices(
        IMapper _mapper,
        IConfiguration _configuration,
        IUserRepository _userRepository
    ) : IInfrastructureServices

    {

        private const int SaltSize                          =   16;
        private const int HashSize                          =   32;
        private const int Iterations                        =   100_000;

        private static readonly HashAlgorithmName Algorithm =   HashAlgorithmName.SHA512;





        public UserDto Login(LoginRequest loginRequest)
        {
            UserModel? foundUser    =   _userRepository.AuthWithEmail(loginRequest.Email)
                                        ?? throw new Exception("User not found");

            bool verified           =   Verify(loginRequest.Password, foundUser.Password);


            if (!verified)
            {
                throw new Exception("Incorrect password");
            }


            return _mapper.Map<UserDto>(foundUser);
        }





        public int CreateNewUser(UserDto userDto)
        {
            userDto.Password = Hash(userDto.Password);

            UserModel user = _mapper.Map<UserModel>(userDto);
            int newUserId = _userRepository.Create(user);

            return newUserId;
        }





        public string CreateToken(UserDto user)
        {
            string secretKey        =   _configuration["Jwt:Secret"]!;
            var securityKey         =   new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials         =   new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor     =   new SecurityTokenDescriptor
            {
                Subject             =   new ClaimsIdentity([
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                ]),
                Expires             =   DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpirationInMinutes"]!)),
                SigningCredentials  =   credentials,
                Issuer              =   _configuration["Jwt:Issuer"],
                Audience            =   _configuration["Jwt:Audience"]
            };

            var handler             =   new JsonWebTokenHandler();

            string token            =   handler.CreateToken(tokenDescriptor);



            return token;
        }





        public string Hash(string password)
        {
            byte[] salt             =   RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash             =   Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }





        public bool Verify(string password, string passwordHash)
        {
            string[] hashParts      =   passwordHash.Split("-");
            byte[] hash             =   Convert.FromHexString(hashParts[0]);
            byte[] salt             =   Convert.FromHexString(hashParts[1]);

            byte[] convertedInputPassword = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            //return hash.SequenceEqual(convertedInputPassword);
            return CryptographicOperations.FixedTimeEquals(hash, convertedInputPassword); // compares based on the length of the array, not on how long it takes to compare the individual values
        }
    }
}

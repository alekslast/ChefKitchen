using AutoMapper;
using DataAccess.Interfaces;
using DataAccess.Models;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;





namespace Infrastructure.Implementations
{
	public class InfrastructureServices(
        IMapper                     _mapper,
        IConfiguration              _configuration,
        IUserRepository             _userRepository,
        IInfrastructureRepository   _infrastructureRepository
    ) : IInfrastructureServices

    {

        private const int SaltSize                          =   16;
        private const int HashSize                          =   32;
        private const int Iterations                        =   100_000;

        private static readonly HashAlgorithmName Algorithm =   HashAlgorithmName.SHA512;





        




        public string CreateJwtToken(UserModel user)
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





        public RefreshTokenModel GenerateRefreshToken()
        {
            var randomNumber            =   new byte[32];


            using (var numberGenerator  =   RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }


            string convertedValue       =   Convert.ToBase64String(randomNumber);


            RefreshTokenModel newRefreshToken = new()
            {
                Created                 =   DateTime.Now,
                Expires                 =   DateTime.Now.AddDays(30),
                IsRevoked               =   false,
                Token                   =   convertedValue
            };



            return newRefreshToken;
        }





        public string RegenerateRefreshToken(string expiredToken)
        {
            try
            {
                //UserDto? finalUser                  =   null;
                UserModel foundUser                 =   null;
                List<UserModel> allUsers            =   _userRepository.GetAll();

                bool validToken                     =   ValidateRefreshToken(expiredToken);
                if (!validToken)
                    return string.Empty;


                foreach (UserModel user in allUsers)
                {
                    if (user.RefreshTokens.FirstOrDefault(x => x.Token == expiredToken) is not null)
                        foundUser = user;
                }


                if (foundUser is null)
                    return string.Empty;


                string newToken_Jwt                 =   CreateJwtToken(foundUser);
                RefreshTokenModel newToken_Refresh  =   GenerateRefreshToken();
                _infrastructureRepository.SaveRefreshToken(newToken_Refresh);



                return newToken_Jwt;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }





        public bool ValidateRefreshToken(string refreshToken)
        {
            var storedToken = _infrastructureRepository.GetToken(refreshToken);


            if (storedToken is null || storedToken.Expires < DateTime.Now || storedToken.IsRevoked)
                return false;


            return true;
        }





        public bool ValidateJwtToken(string token)
        {
            var jwtToken = new JsonWebTokenHandler().ReadJsonWebToken(token);
            return jwtToken.ValidTo < DateTime.UtcNow;
        }





        public string Hash(string password)
        {
            byte[] salt             =   RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash             =   Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }





        public bool VerifyPasswordAgainstHash(string password, string passwordHash)
        {
            string[] hashParts              =   passwordHash.Split("-");
            byte[] hash                     =   Convert.FromHexString(hashParts[0]);
            byte[] salt                     =   Convert.FromHexString(hashParts[1]);

            byte[] convertedInputPassword   =   Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            return CryptographicOperations.FixedTimeEquals(hash, convertedInputPassword); // compares based on the length of the array, not on how long it takes to compare the individual values
        }
    




        public void SendEmail(string receiver, string subject, string body)
        {
			// Create SMTP-server for Gmail
			string smtpServer       =   "smtp.gmail.com";
			int smtpPort            =   587;
			string smtpUsername     =   _configuration["Smtp:Email"];
			string smtpPassword     =   _configuration["Smtp:Password"];

			// Create a message
			MailMessage mail        =   new();
			mail.From               =   new(smtpUsername);
			mail.Subject            =   subject;
			mail.Body               =   body;
			mail.To.Add(receiver);

			// Configure SMTP-client
			SmtpClient smtpClient   =   new(smtpServer, smtpPort);
			smtpClient.Credentials  =   new NetworkCredential(smtpUsername, smtpPassword);
			smtpClient.EnableSsl    =   true; // Gmail forces SSL usage

			try
			{
				// Send the message
				smtpClient.Send(mail);
				Console.WriteLine("Email sent successfully.");
			}
			catch (Exception ex)
			{
				Console.WriteLine("Failed to send email: " + ex.Message);
			}
		}

    }
}

using DataAccess.Models;





namespace BusinessLogic.DTOs
{
    public class UserDto
    {
        public int                  Id              { get; set; }
        public required string      Name            { get; set; }
        public required string      Email           { get; set; }
        public string?              PhoneNumber     { get; set; }
        public required string      Password        { get; set; }
        public string?              RecoveryCode    { get; set; }
        public string?              Telegram        { get; set; }
        public string?              Country         { get; set; }
        public string?              City            { get; set; }
        public string?              Street          { get; set; }
        public string?              PostalCode      { get; set; }
        public int                  Bonuses         { get; set; }

        public List<OrderModel>?    Orders          { get; set; }
        public ICollection<RefreshTokenModel>? RefreshTokens { get; set; }
    }
}

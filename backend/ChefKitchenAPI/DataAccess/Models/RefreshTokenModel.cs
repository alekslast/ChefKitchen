namespace DataAccess.Models
{
    public class RefreshTokenModel
    {
        public int          Id          { get; set; }
        public string       Token       { get; set; }
        public DateTime     Expires     { get; set; } 
        public DateTime     Created     { get; set; }
        public bool         IsRevoked   { get; set; } = false;

        public int          UserId      { get; set; }
        public UserModel    User        { get; set; }
    }
}

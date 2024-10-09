using DataAccess.Models;

namespace Domain.Models
{
    public class User
    {
        public int                  Id              { get; set; }
        //public string               FirstName       { get; set; }
        //public string               LastName        { get; set; }
        public string               Name            { get; set; }
        public string               Email           { get; set; }
        public string               PhoneNumber     { get; set; }
        public string?              Password        { get; set; }
        public string?              Telegram        { get; set; }
        public string?              Country         { get; set; }
        public string?              City            { get; set; }
        public string?              Street          { get; set; }
        public string?              PostalCode      { get; set; }

        public List<OrderModel>?    Orders          { get; set; }
    }
}

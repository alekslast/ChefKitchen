namespace DataAccess.Models
{
    public class OrderModel
    {
        public int                      Id              { get; set; }
        public bool                     IsDelivery      { get; set; }
        public DateTime                 Date            { get; set; }
        public DateTime                 Time            { get; set; }

        public UserModel                User            { get; set; }
        public List<MenuItemModel>      MenuItems       { get; set; }
    }
}

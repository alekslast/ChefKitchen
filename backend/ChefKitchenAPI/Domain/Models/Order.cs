using DataAccess.Models;

namespace Domain.Models
{
    public class Order
    {
        public int                      Id              { get; set; }
        public bool                     IsDelivery      { get; set; }
        public DateTime                 Date            { get; set; }
        public DateTime                 Time            { get; set; }

        public List<MenuItemModel>      MenuItems       { get; set; }
    }
}

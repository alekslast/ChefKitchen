using DataAccess.Models;

namespace BusinessLogic.DTOs
{
    public class OrderDto
    {
        public int                      Id              { get; set; }
        public bool                     IsDelivery      { get; set; }
        public DateTime                 Date            { get; set; }
        public DateTime                 Time            { get; set; }

        public List<MenuItemModel>      MenuItems       { get; set; }
    }
}

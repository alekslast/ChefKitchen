using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTOs
{
	public class UserFEModel
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string? PhoneNumber { get; set; }
		public string? Telegram { get; set; }
		public string? Country { get; set; }
		public string? City { get; set; }
		public string? Street { get; set; }
		public string? PostalCode { get; set; }
		public int Bonuses { get; set; }

		public List<OrderModel>? Orders { get; set; }
	}
}

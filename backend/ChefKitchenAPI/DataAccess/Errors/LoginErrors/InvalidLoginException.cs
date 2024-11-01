using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Errors.LoginErrors
{
	public class InvalidLoginException : Exception
	{
		public InvalidLoginException(string message = "Invalid email or password") : base(message)
		{
		}
	}
}

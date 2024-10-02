using Microsoft.AspNetCore.Mvc;

namespace ChefKitchenAPI.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

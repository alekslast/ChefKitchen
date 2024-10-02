using Microsoft.AspNetCore.Mvc;

namespace ChefKitchenAPI.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

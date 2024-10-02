using Microsoft.AspNetCore.Mvc;

namespace ChefKitchenAPI.Controllers
{
    public class ManuItemController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

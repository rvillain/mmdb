using mots_marrants.web.Constants;
using mots_marrants.web.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace mots_marrants.web.Controllers
{
    public class HomeController : Controller
    {

        public HomeController(IHttpClientFactory httpClientFactory)
        {
        }

        /// <summary>
        /// SPA entry point
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
    }
}
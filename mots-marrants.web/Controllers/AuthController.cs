using mots_marrants.web.Constants;
using mots_marrants.web.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using mots_marrants.DAL;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using mots_marrants.web.BL;

namespace mots_marrants.web.Controllers
{
    [Route(ApiRoutes.WordRoutes.BaseRoute + "/auth")]
    public class AuthController : Controller
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]UserViewModel user)
        {
            var authUser = await _userService.Authenticate(user.Login, user.Password);

            if (authUser == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(authUser);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserViewModel user)
        {
            var appUser = await _userService.Register(user.Login, user.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return await Authenticate(user);
        }

    }
}
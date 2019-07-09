using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using mots_marrants.DAL;
using mots_marrants.web.Models;

namespace mots_marrants.web.BL
{

public interface IUserService
    {
        Task<object> Authenticate(string username, string password);
        Task<object> Register(string username, string password);
        List<string> GetSampler(string userId);
        void AddToSampler(string userId, WordData wordData);
        void SaveSampler(string userId, string sampler);
    }

    public class UserService : IUserService
    {
        private readonly WordContext _context;
        private readonly AppSettings _appSettings;        

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public UserService(WordContext wordContext, IOptions<AppSettings> appSettings
            , UserManager<ApplicationUser> userManager
            , SignInManager<ApplicationUser> signInManager)
        {
            _context = wordContext;
             _appSettings = appSettings.Value;
             _userManager = userManager;
             _signInManager = signInManager;
        }

        public async Task<object> Authenticate(string username, string password)
        {
            //var user = _context.Users.SingleOrDefault(x => x.UserName == username);
            //var result = _signInManager.CheckPasswordSignInAsync(user, password, false);
            var result = await _signInManager.PasswordSignInAsync(username, password, true, lockoutOnFailure: true);

            // return null if user not found
            if ( !result.Succeeded)
                return null;
            
            var user = _context.Users.FirstOrDefault(u=>u.UserName == username);

            var role = string.Empty;
            role += (await _userManager.GetRolesAsync(user)).FirstOrDefault();

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var vm = new UserViewModel{
                Login = username,
                Token = tokenHandler.WriteToken(token)
            };

            var roles = await _userManager.GetRolesAsync(user);
            if(roles.Any()){
                vm.Role = roles.First();
            }

            return vm;
        }



        public void AddToSampler(string userId, WordData wordData)
        {
            var user = _context.Users.FirstOrDefault(u=>u.Id == userId);
            if(user.Sampler == null || user.Sampler.Length == 0){
                user.Sampler = wordData.Word;
            }
            else{
                user.Sampler += "," + wordData.Word;
            }
            _context.Update(user);
            _context.SaveChanges();
        }
        public List<string> GetSampler(string userId)
        {
            var user = _context.Users.FirstOrDefault(u=>u.Id == userId);

            if(user.Sampler != null && user.Sampler.Length >0){
                return user.Sampler.Split(",").ToList();
            }
            else{
                return new List<string>();
            }
        }

        public void SaveSampler(string userId, string sampler)
        {
            var user = _context.Users.FirstOrDefault(u=>u.Id == userId);
            user.Sampler = sampler;
            _context.Update(user);
            _context.SaveChanges();
        }

        public async Task<object> Register(string username, string password)
        {
            ApplicationUser user = new ApplicationUser{
                UserName = username
            };

            var result = await _userManager.CreateAsync(user, password);
            if(result.Succeeded){
                var vm = new UserViewModel{
                    Login = user.UserName
                };
                return vm;
            }
            else{
                return result.Errors;
            }
        }
    }
}
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
using System.Security.Claims;
using System.Collections.Generic;

namespace mots_marrants.web.Controllers
{
    [Route(ApiRoutes.WordRoutes.BaseRoute + "/word")]
    public class WordController : Controller
    {

        private readonly HttpClient _httpClient;
        private WordContext _wordContext;
        private IUserService _userService;

        public WordController(IHttpClientFactory httpClientFactory, WordContext wordContext, IUserService userService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _wordContext = wordContext;
            _userService = userService;
        }

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] SearchViewModel search)
        {
            var words = _wordContext.WordData.Include(WordData=>WordData.WordRates).Where(w => w.Validated);
            if(search.Search != null){
                words = words.Where(w => w.Word.ToLower().Contains(search.Search.ToLower()));

            }
            if(search.WordTypes != null && search.WordTypes.Count > 0){
                words = words.Where(w => search.WordTypes.IndexOf(w.WordType)>-1);
            }
            if(search.Rate > 0){
                words = words.Where(w => w.Rate > search.Rate);
            }
            return Ok(words.ToList());
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getForAdmin")]
        public async Task<IActionResult> GetForAdmin()
        {
            var words = _wordContext.WordData.Include(WordData=>WordData.WordRates).Where(w => true);
            return Ok(words.ToList());
        }

        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody] WordData wordData)
        {
            wordData.CreationDate = DateTime.Now;
            wordData.Validated = false;
            _wordContext.Add(wordData);
            _wordContext.SaveChanges();

            return Ok(wordData);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] WordData wordData)
        {
            if(id == wordData.Id){
                _wordContext.Update(wordData);
                _wordContext.SaveChanges();
            }

            return Ok(wordData);
        }

        
        [HttpPost("rate")]
        public async Task<IActionResult> Rate([FromBody] WordRate wordRate)
        {
            _wordContext.Add(wordRate);
            _wordContext.SaveChanges();

            var updatedWordData = _wordContext.WordData.Include(w=>w.WordRates).FirstOrDefault(w=>w.Id == wordRate.WordDataId);

            return Ok(updatedWordData);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWordAsync([FromRoute] int id)
        {
            if (id == default(int))
                return BadRequest();

            var word = _wordContext.WordData.Find(id);

            return Ok(word);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (id == default(int))
                return BadRequest();

            var word = _wordContext.WordData.Find(id);
            _wordContext.WordData.Remove(word);
            _wordContext.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpPost("addToSampler")]
        public async Task<IActionResult> AddToSampler([FromBody] WordData wordData)
        {
            var userId = User.FindFirst(ClaimTypes.Name).Value;
            _userService.AddToSampler(userId, wordData);

            return Ok(wordData);
        }

        
        [Authorize]
        [HttpPost("saveSampler")]
        public async Task<IActionResult> SaveSampler([FromBody] UserViewModel userVM)
        {
            var userId = User.FindFirst(ClaimTypes.Name).Value;
            _userService.SaveSampler(userId, userVM.Sampler);

            return Ok();
        }

        [Authorize]
        [HttpGet("getSampler")]
        public async Task<IActionResult> GetSampler()
        {
            var words = _wordContext.WordData.Include(WordData=>WordData.WordRates).Where(w => w.Validated);
            var userId = User.FindFirst(ClaimTypes.Name).Value;
            List<string> sampler =_userService.GetSampler(userId);

            return Ok(sampler);
        }
    }
}
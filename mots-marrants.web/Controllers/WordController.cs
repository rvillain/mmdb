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

namespace mots_marrants.web.Controllers
{
    [Route(ApiRoutes.WordRoutes.BaseRoute)]
    public class WordController : Controller
    {

        private readonly HttpClient _httpClient;
        private WordContext _wordContext;

        public WordController(IHttpClientFactory httpClientFactory, WordContext wordContext)
        {
            _httpClient = httpClientFactory.CreateClient();
            _wordContext = wordContext;
        }

        

        [HttpGet(ApiRoutes.WordRoutes.Words)]
        public async Task<IActionResult> Get()
        {
            return Ok(DataTest.Words);
        }

        [HttpPost(ApiRoutes.WordRoutes.Search)]
        public async Task<IActionResult> Search([FromBody] SearchViewModel search)
        {
            var words = _wordContext.WordData.Include(WordData=>WordData.WordRates).Where(w=>true);
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

        [HttpPost(ApiRoutes.WordRoutes.Words)]
        public async Task<IActionResult> Post([FromBody] WordData wordData)
        {
            wordData.CreationDate = DateTime.Now;
            wordData.Validated = false;
            _wordContext.Add(wordData);
            _wordContext.SaveChanges();

            return Ok(wordData);
        }

        
        [HttpPut(ApiRoutes.WordRoutes.WordById)]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] WordData wordData)
        {
            if(id == wordData.Id){
                _wordContext.Update(wordData);
                _wordContext.SaveChanges();
            }

            return Ok(wordData);
        }

        
        [HttpPost(ApiRoutes.WordRoutes.Rate)]
        public async Task<IActionResult> Rate([FromBody] WordRate wordRate)
        {
            _wordContext.Add(wordRate);
            _wordContext.SaveChanges();

            var updatedWordData = _wordContext.WordData.Include(w=>w.WordRates).FirstOrDefault(w=>w.Id == wordRate.WordDataId);

            return Ok(updatedWordData);
        }

        [HttpGet(ApiRoutes.WordRoutes.WordById)]
        public async Task<IActionResult> GetWordAsync([FromRoute] int id)
        {
            if (id == default(int))
                return BadRequest();

            var word = _wordContext.WordData.Find(id);

            return Ok(word);
        }

        [HttpDelete(ApiRoutes.WordRoutes.WordById)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (id == default(int))
                return BadRequest();

            var word = _wordContext.WordData.Find();
            _wordContext.WordData.Remove(word);
            _wordContext.SaveChanges();
            return Ok();
        }
    }
}
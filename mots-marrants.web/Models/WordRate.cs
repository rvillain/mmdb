using System;

namespace mots_marrants.web.Models
{
    public class WordRate
    {
        public int Id { get; set; }
        public int WordDataId { get; set; }
        public WordData WordData { get; set; }

        public int Rate { get; set; }
    }
}
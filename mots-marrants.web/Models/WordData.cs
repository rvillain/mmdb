using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace mots_marrants.web.Models
{
    public class WordData
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public string Definition { get; set; }
        public string Link { get; set; }
        public string Author { get; set; }
        public DateTime CreationDate { get; set; }
        public string Examples { get; set; }

        [JsonIgnore]
        public List<WordRate> WordRates { get; set; }

        public bool Validated { get; set; }
        public DateTime? ValidationDate { get; set; }

        public string WordType { get; set; }

        [NotMapped]
        public double? Rate {
            get {
                return WordRates != null && WordRates.Count > 0 ? (double?)Math.Round(WordRates.Average(w=>w.Rate),2) : null;
            }
        }

        [NotMapped]
        public int RateCount {
            get {
                return WordRates != null ? WordRates.Count: 0;
            }
        }
    }
}
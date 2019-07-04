using System;
using System.Collections.Generic;

namespace mots_marrants.web.Models
{
    public class SearchViewModel
    {
        public string Search { get; set; }
        public List<string> WordTypes { get; set; }

        public double Rate { get; set; }

    }
}
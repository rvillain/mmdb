using System;
using System.Collections.Generic;
using System.Linq;

namespace mots_marrants.web.Models
{
    public static class DataTest
    {

        private static string[] words = new string[]{"Pédiluve", "Roploplo", "Dru", "Goulu", "Truite", "Rififi", "Grabuge", "Strapontin", "Pneu", "Flibustier"};
        private static WordData CreateWord(string word){
            return new WordData{
                Author = "admin",
                CreationDate = DateTime.Now,
                Word = word
            };
        }
        public static List<WordData> Words { 
            get {
                return new List<string>(words).Select(w=>CreateWord(w)).ToList();
            } 
        }
    }
}
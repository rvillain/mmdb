using Microsoft.EntityFrameworkCore;
using mots_marrants.web.Models;
using System.Collections.Generic;

namespace mots_marrants.DAL
{
    public class WordContext : DbContext
    {
        public WordContext(DbContextOptions<WordContext> options)
            : base(options)
        { }

        public DbSet<WordData> WordData { get; set; }
        public DbSet<WordRate> WordRate { get; set; }
    }
   
}
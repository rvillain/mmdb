using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using mots_marrants.web.Models;
using System.Collections.Generic;

namespace mots_marrants.DAL
{
    public class WordContext : IdentityDbContext<ApplicationUser>
    {
        public WordContext(DbContextOptions<WordContext> options)
            : base(options)
        { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "Admin".ToUpper() });
        }

        public DbSet<WordData> WordData { get; set; }
        public DbSet<WordRate> WordRate { get; set; }
    }
   
}
using System;
using Microsoft.AspNetCore.Identity;

namespace mots_marrants.web.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string Sampler { get; set; }
    }
}
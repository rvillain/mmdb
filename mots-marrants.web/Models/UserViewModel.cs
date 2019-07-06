using System;
using System.Collections.Generic;

namespace mots_marrants.web.Models
{
    public class UserViewModel
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        public string Role { get; set; }
        public string Sampler { get; set; }

    }
}
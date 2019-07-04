using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using mots_marrants.DAL;
using Newtonsoft.Json;

namespace mots_marrants.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            
            services.Configure<RouteOptions>(options => options.LowercaseUrls = true);
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddDbContext<WordContext>(options => options.UseSqlServer(Configuration.GetConnectionString("WordDatabase")));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "spa-route",
                    template: "{controller}/{*anything=Index}",
                    defaults: new { action = "Index" });
                
                routes.MapRoute(
                   name: "app-fallback",
                   template: "{*anything}/",
                   defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
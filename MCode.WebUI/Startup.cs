// ***********************************************************************
// Assembly         : MCode.WebUI
// ***********************************************************************
// <copyright file="Startup.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.WebUI
{
    using Microsoft.AspNet.Builder;
    using Microsoft.AspNet.Hosting;
    using Microsoft.Extensions.DependencyInjection;

    /// <summary>
    /// Class Startup.
    /// </summary>
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        public void Configure(IApplicationBuilder app)
        {
            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.UseStaticFiles();

            app.UseMvc(
                routes => { routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}"); });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
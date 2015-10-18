// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="Startup.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.WebUI
{
    using Microsoft.Owin;
    using Microsoft.Owin.Security.Cookies;

    using Owin;

    /// <summary>
    /// Class Startup.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Configurations the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
                                            {
                                                AuthenticationType = "AuthCookie",
                                                LoginPath = new PathString("/auth/login")
                                            });
        }
    }
}
// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="RouteConfig.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The route config.</summary>
// ***********************************************************************

namespace MCode.WebUI
{
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// The route config.
    /// </summary>
    public static class RouteConfig
    {
        /// <summary>
        /// Registers routes.
        /// </summary>
        /// <param name="routes">The routes.</param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.Ignore("{resources}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional });
        }
    }
}
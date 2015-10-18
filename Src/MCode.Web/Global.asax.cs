// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="Global.asax.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The global.</summary>
// ***********************************************************************

namespace MCode.WebUI
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    /// <summary>
    /// The global.
    /// </summary>
    public class Global : HttpApplication
    {
        /// <summary>
        /// The application_ start.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The e.</param>
        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
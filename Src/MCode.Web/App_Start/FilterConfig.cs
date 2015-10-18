// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="FilterConfig.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The filter config.</summary>
// ***********************************************************************

namespace MCode.WebUI
{
    using System.Web.Mvc;

    /// <summary>
    /// The filter config.
    /// </summary>
    public static class FilterConfig
    {
        /// <summary>
        /// Registers the global filters.
        /// </summary>
        /// <param name="filters">The filters.</param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new AuthorizeAttribute());
        }
    }
}
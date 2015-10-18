// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="BundleConfig.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The bundle config.</summary>
// ***********************************************************************

namespace MCode.WebUI
{
    using System.Web.Optimization;

    /// <summary>
    /// The bundle config.
    /// </summary>
    public static class BundleConfig
    {

        /// <summary>
        /// Registers the bundles.
        /// </summary>
        /// <param name="bundles">The bundles.</param>
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/library").Include("~/client/libs/*.js"));
            bundles.Add(new StyleBundle("~/content").Include("~/client/content/*.css"));
        }
    }
}
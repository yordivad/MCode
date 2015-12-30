// ***********************************************************************
// Assembly         : MCode.Host
// ***********************************************************************
// <copyright file="Startup.cs" company="MCode">
//     © 2015 MCode
// </copyright>
// <summary>The startup.</summary>
// ***********************************************************************

namespace MCode.Host
{
    using System;
    using System.Web.Http;
    using MCode.Core;
    using MCode.Core.Configuration;
    using Ninject;
    using Ninject.Web.Common.OwinHost;
    using Ninject.Web.WebApi.OwinHost;
    using Owin;

    /// <summary>
    /// The startup.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Configurations the specified application builder.
        /// </summary>
        /// <param name="appBuilder">The application builder.</param>
        public void Configuration(IAppBuilder appBuilder)
        {
            var catalog = new Catalog();
            var container = catalog.Initialize();

            var binding = new Binding();
            var kernel = binding.Initialize();
            kernel.Bind<IAppBuilder>().ToMethod(c => appBuilder).InSingletonScope();
            var runner = new ApiRunner(kernel.TryGet<IWebContext>(), kernel, container);
            runner.Start();

            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "DefaultAPI",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { action = "Get",  id = RouteParameter.Optional });
            
            appBuilder.UseNinjectMiddleware(() => kernel).UseNinjectWebApi(config);
        }
    }
}
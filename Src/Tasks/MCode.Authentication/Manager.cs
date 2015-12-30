// ***********************************************************************
// Assembly         : MCode.Authentication
// ***********************************************************************
// <copyright file="Initialize.cs" company="MCode">
//     Copyright ©  2015
// </copyright>
// <summary>The initialize.</summary>
// ***********************************************************************
namespace MCode.Authentication
{
    using System;
    using System.ComponentModel.Composition;

    using MCode.Authentication.Services;
    using MCode.Core.Configuration;
    using MCode.Core.Initialization;

    using Microsoft.Owin;
    using Microsoft.Owin.Security.Cookies;

    using Ninject;

    using Owin;

    /// <summary>
    /// The initialize.
    /// </summary>
    [Export(typeof(IWebApi))]
    public class Manager : IWebApi
    {
        /// <summary>
        /// Configures the specified kernel.
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        public void Configure(IKernel kernel)
        {
            kernel.Bind<ILoginRepository>().To<LoginRepository>();
        }

        /// <summary>
        /// Initializes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        public void Initialize(IWebContext context)
        {
            context.AppBuilder.UseCookieAuthentication(
                new CookieAuthenticationOptions
                    {
                        AuthenticationType = "AuthCookie",
                        LoginPath = new PathString("/auth/login")
                    });
        }
    }
}
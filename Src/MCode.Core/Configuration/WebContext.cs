// ***********************************************************************
// Assembly         : MCode.Core
// ***********************************************************************
// <copyright file="WebContext.cs" company="Aurea">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>WebContext.cs</summary>
// ***********************************************************************

namespace MCode.Core.Configuration
{
    using Owin;

    /// <summary>
    ///     Class WebContext.
    /// </summary>
    public class WebContext : IWebContext
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="WebContext" /> class.
        /// </summary>
        /// <param name="config">The configuration.</param>
        /// <param name="appBuilder">The application builder.</param>
        public WebContext(IConfig config, IAppBuilder appBuilder)
        {
            this.Config = config;
            this.AppBuilder = appBuilder;
        }

        /// <summary>
        ///     Gets or sets the application builder.
        /// </summary>
        /// <value>The application builder.</value>
        public IAppBuilder AppBuilder { get; set; }

        /// <summary>
        ///     Gets or sets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public IConfig Config { get; set; }
    }
}
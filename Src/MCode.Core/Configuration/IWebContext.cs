// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="IWebContext.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core.Configuration
{
    using Owin;

    /// <summary>
    ///     Interface IWebConfig
    /// </summary>
    public interface IWebContext : IContext
    {
        /// <summary>
        ///     Gets or sets the application builder.
        /// </summary>
        /// <value>The application builder.</value>
        IAppBuilder AppBuilder { get; set; }
    }
}
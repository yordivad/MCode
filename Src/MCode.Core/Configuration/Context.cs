// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-18-2015
//
// Last Modified By : Roy
// Last Modified On : 10-18-2015
// ***********************************************************************
// <copyright file="Context.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core.Configuration
{
    /// <summary>
    ///     Class Context.
    /// </summary>
    public class Context : IContext
    {
        public Context(IConfig config)
        {
            this.Config = config;
        }

        /// <summary>
        ///     Gets or sets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public IConfig Config { get; set; }
    }
}
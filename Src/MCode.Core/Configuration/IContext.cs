// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="IContext.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.Core.Configuration
{
    /// <summary>
    /// Interface IContext
    /// </summary>
    public interface IContext
    {
        /// <summary>
        /// Gets or sets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        IConfig Config { get; set; }
    }
}
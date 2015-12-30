// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="IWebApi.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core.Initialization
{
    using MCode.Core.Configuration;

    using Ninject;

    /// <summary>
    ///     Interface IWebApi
    /// </summary>
    public interface IWebApi
    {
        /// <summary>
        ///     Initializes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        void Initialize(IWebContext context);

        /// <summary>
        ///     Configures the specified kernel.
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        void Configure(IKernel kernel);
    }
}
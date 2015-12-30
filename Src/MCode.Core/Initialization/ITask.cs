// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="ITask.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core.Initialization
{
    using MCode.Core.Configuration;

    /// <summary>
    ///     Interface ITask
    /// </summary>
    public interface ITask
    {
        /// <summary>
        ///     Initializes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        void Initialize(IContext context);
    }
}
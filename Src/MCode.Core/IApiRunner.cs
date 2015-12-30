// ***********************************************************************
// Assembly         : MCode.Core
// ***********************************************************************
// <copyright file="IApiRunner.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core
{
    using System.Collections.Generic;

    using MCode.Core.Initialization;

    /// <summary>
    ///     Interface IApiRunner
    /// </summary>
    public interface IApiRunner
    {
        /// <summary>
        ///     Gets or sets the task.
        /// </summary>
        /// <value>The task.</value>
        IEnumerable<IWebApi> Task { get; set; }

        /// <summary>
        ///     Starts this instance.
        /// </summary>
        void Start();
    }
}
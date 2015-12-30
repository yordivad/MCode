// ***********************************************************************
// Assembly         : MCode.Core
// ***********************************************************************
// <copyright file="IRunner.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core
{
    using System.Collections.Generic;

    using MCode.Core.Initialization;

    /// <summary>
    ///     Interface IRunner
    /// </summary>
    public interface IRunner
    {
        /// <summary>
        ///     Gets or sets the task.
        /// </summary>
        /// <value>The task.</value>
        IEnumerable<ITask> Task { get; set; }

        /// <summary>
        ///     Starts all.
        /// </summary>
        void StartAll();
    }
}
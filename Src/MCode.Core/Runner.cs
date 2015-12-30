// ***********************************************************************
// Assembly         : MCode.Core
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="Runner.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core
{
    using System.Collections.Generic;
    using System.ComponentModel.Composition;

    using MCode.Core.Configuration;
    using MCode.Core.Initialization;

    using Ninject;

    /// <summary>
    ///     Class Runner.
    /// </summary>
    public class Runner : IRunner
    {
        /// <summary>
        ///     The context
        /// </summary>
        private readonly IContext context;

        /// <summary>
        ///     The kernel
        /// </summary>
        private readonly IKernel kernel;

        /// <summary>
        ///     Initializes a new instance of the <see cref="Runner" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="webContext">The web context.</param>
        /// <param name="kernel">The kernel.</param>
        public Runner(IContext context, IKernel kernel)
        {
            this.context = context;
            this.kernel = kernel;
        }

        /// <summary>
        ///     Gets or sets the task.
        /// </summary>
        /// <value>The task.</value>
        [ImportMany]
        public IEnumerable<ITask> Task { get; set; }

        /// <summary>
        ///     Starts all.
        /// </summary>
        public void StartAll()
        {
            foreach (var task in this.Task)
            {
                task.Initialize(this.context);
            }
        }
    }
}
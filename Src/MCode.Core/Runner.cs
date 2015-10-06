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

using MCode.Core.Configuration;

namespace MCode.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.Composition;

    /// <summary>
    /// Class Runner.
    /// </summary>
    public class Runner
    {
        private readonly IContext context;
        private readonly IWebContext webContext;

        public Runner(IContext context, IWebContext webContext)
        {
            this.context = context;
            this.webContext = webContext;
        }

        /// <summary>
        /// Gets or sets the task.
        /// </summary>
        /// <value>The task.</value>
        [ImportMany]
        public IEnumerable<ITask> Task { get; set; }

        /// <summary>
        /// Starts all.
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
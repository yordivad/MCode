// ***********************************************************************
// Assembly         : MCode.Core
// ***********************************************************************
// <copyright file="ApiRunner.cs" company="MCore">
//     © 2015 MCore
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace MCode.Core
{
    using System.Collections.Generic;
    using System.ComponentModel.Composition;
    using System.ComponentModel.Composition.Hosting;

    using MCode.Core.Configuration;
    using MCode.Core.Initialization;

    using Ninject;

    /// <summary>
    ///     Class ApiRunner.
    /// </summary>
    public class ApiRunner : IApiRunner
    {
        /// <summary>
        ///     The web context
        /// </summary>
        private readonly IWebContext webContext;

        /// <summary>
        ///     The kernel
        /// </summary>
        private readonly IKernel kernel;

        /// <summary>
        /// The container
        /// </summary>
        private readonly CompositionContainer container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApiRunner" /> class.
        /// </summary>
        /// <param name="webContext">The web context.</param>
        /// <param name="kernel">The kernel.</param>
        /// <param name="container">The container.</param>
        public ApiRunner(IWebContext webContext, IKernel kernel, CompositionContainer container)
        {
            this.webContext = webContext;
            this.kernel = kernel;
            this.container = container;
        }

        /// <summary>
        ///     Gets or sets the Task.
        /// </summary>
        /// <value>The Task.</value>
        [ImportMany]
        public IEnumerable<IWebApi> Task { get; set; }

        /// <summary>
        ///     Starts this instance.
        /// </summary>
        public void Start()
        {
           this.container.SatisfyImportsOnce(this);
            foreach (var task in this.Task)
            {
                task.Initialize(this.webContext);
                task.Configure(this.kernel);
            }
        }
    }
}
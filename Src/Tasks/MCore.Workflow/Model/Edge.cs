// ***********************************************************************
// Assembly         : MCore.Workflow
// ***********************************************************************
// <copyright file="Edge.cs" company="MCode">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>Edge.cs</summary>
// ***********************************************************************
namespace MCore.Workflow.Model
{
    using System;

    /// <summary>
    /// Class Edge.
    /// </summary>
    public class Edge
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the source.
        /// </summary>
        /// <value>The source.</value>
        public Guid Source { get; set; }


        /// <summary>
        /// Gets or sets the target.
        /// </summary>
        /// <value>The target.</value>
        public Guid Target { get; set; }
    }
}
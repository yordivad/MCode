// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Graph.cs" company="MCode">
//   Copyright ©  2015
// </copyright>
// <summary>
//   The workflow.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace MCore.Workflow.Model
{
    using System;
    using System.Collections.Generic;
   
    /// <summary>
    /// The Graph.
    /// </summary>
    public class Graph
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public Guid id  { get; set; }

        /// <summary>
        /// Gets or sets the properties.
        /// </summary>
        /// <value>The properties.</value>
        public Property Properties { get; set; }

        /// <summary>
        /// Gets or sets the children.
        /// </summary>
        /// <value>The children.</value>
        public IEnumerable<Child> Children { get; set; }


        /// <summary>
        /// Gets or sets the edges.
        /// </summary>
        /// <value>The edges.</value>
        public IEnumerable<Edge> Edges { get; set; } 
    }

}
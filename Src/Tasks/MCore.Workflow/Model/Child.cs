// ***********************************************************************
// Assembly         : MCore.Workflow
// ***********************************************************************
// <copyright file="Child.cs" company="MCode">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>Child.cs</summary>
// ***********************************************************************
namespace MCore.Workflow.Model
{
    using System;
    using System.Security.Permissions;

    /// <summary>
    /// Class Child.
    /// </summary>
    public class Child
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the width.
        /// </summary>
        /// <value>The width.</value>
        public int Width { get; set; }

        /// <summary>
        /// Gets or sets the height.
        /// </summary>
        /// <value>The height.</value>
        public int Height { get; set; }
    }
}
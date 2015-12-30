// ***********************************************************************
// Assembly         : MCore.Workflow
// ***********************************************************************
// <copyright file="Property.cs" company="MCode">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>Property.cs</summary>
// ***********************************************************************
namespace MCore.Workflow.Model
{
    /// <summary>
    /// Class Property.
    /// </summary>
    public class Property
    {
        /// <summary>
        /// Gets the direction.
        /// </summary>
        /// <value>The direction.</value>
        public string Direction { get; internal set; }

        /// <summary>
        /// Gets or sets the spacing.
        /// </summary>
        /// <value>The spacing.</value>
        public int Spacing { get; set; }
    }
}
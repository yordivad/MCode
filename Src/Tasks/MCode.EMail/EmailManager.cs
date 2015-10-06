// ***********************************************************************
// Assembly         : MCode.Email
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="EmailManager.cs" company="MCode">
//     © 2015 MCode
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.Email
{
    using System.ComponentModel.Composition;
    using Core.Configuration;
    using Core.Initialization;
    using Domain;

    /// <summary>
    /// Class EmailManager.
    /// </summary>
    [Export(typeof(ITask))]
    public class EmailManager : ITask
    {
        /// <summary>
        /// Initializes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        public void Initialize(IContext context)
        {
            var config = new EmailConfig();
        }
    }
}
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
        /// Gets or sets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public EmailConfig Config { get; set; }

        /// <summary>
        /// Initializes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        public void Initialize(IContext context)
        {
            this.Config = new EmailConfig
            {
                Server = context.Config.Settings["Server"],
                Port = int.Parse(context.Config.Settings["Port"]),
                EnableSsl = bool.Parse(context.Config.Settings["EnableSsl"]),
                User = context.Config.Settings["User"],
                Password = context.Config.Settings["Password"]
            };
        }
    }
}
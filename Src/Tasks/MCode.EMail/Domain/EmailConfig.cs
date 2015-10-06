// ***********************************************************************
// Assembly         : MCode.Email
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="EmailConfig.cs" company="MCode">
//     © 2015 MCode
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.Email.Domain
{
    /// <summary>
    /// Class Config.
    /// </summary>
    public class EmailConfig
    {
        /// <summary>
        /// Gets or sets the server.
        /// </summary>
        /// <value>The server.</value>
        public string Server { get; set; }

        /// <summary>
        /// Gets or sets the port.
        /// </summary>
        /// <value>The port.</value>
        public int Port { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether [enable SSL].
        /// </summary>
        /// <value><c>true</c> if [enable SSL]; otherwise, <c>false</c>.</value>
        public bool EnableSsl { get; set; }

        /// <summary>
        /// Gets or sets the user.
        /// </summary>
        /// <value>The user.</value>
        public string User { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>The password.</value>
        public string Password { get; set; }
    }
}
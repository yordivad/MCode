// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="LoginModel.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The login model.</summary>
// ***********************************************************************
namespace MCode.WebUI.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;

    /// <summary>
    /// The login model.
    /// </summary>
    public class LoginModel
    {
        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>The password.</value>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>
        /// Gets or sets the return URL.
        /// </summary>
        /// <value>The return URL.</value>
        [HiddenInput(DisplayValue = false)]
        public string ReturnUrl { get; set; }
    }
}
// ***********************************************************************
// Assembly         : MCode.Authentication
// ***********************************************************************
// <copyright file="AuthController.cs" company="MCode">
//     Copyright ©  2015
// </copyright>
// <summary>The auth controller.</summary>
// ***********************************************************************

namespace MCode.Authentication.Controller
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Security.Claims;
    using System.Web.Http;

    using MCode.Authentication.Model;
    using MCode.Authentication.Services;

    using Microsoft.Owin.Security;

    /// <summary>
    /// The authentication controller.
    /// </summary>
    [AllowAnonymous]
    public class AuthController : ApiController
    {

        /// <summary>
        /// The repository
        /// </summary>
        private ILoginRepository repository;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController"/> class.
        /// </summary>
        /// <param name="repository">The repository.</param>
        public AuthController(ILoginRepository repository)
        {
            this.repository = repository;
        }

        /// <summary>
        /// Logins the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        public void Login(Login model)
        {
            if (model.Email != "yordivad@gmail.com")
            {
                return;
            }

            var identity = new ClaimsIdentity(
                new[]
                    {
                        new Claim(ClaimTypes.Name, "Roy"),
                        new Claim(ClaimTypes.Email, "yordivad@gmail.com"),
                        new Claim(ClaimTypes.Gender, "Masculine"),
                        new Claim(ClaimTypes.Country, "Costa Rica")
                    },
                "AuthCookie");
            var context = this.Request.GetOwinContext();
            var authManage = context.Authentication;
            authManage.SignIn(new AuthenticationProperties { IsPersistent = true }, identity);
        }

        /// <summary>
        /// Logout to remove the cookie.
        /// </summary>
        public void Logout()
        {
            var context = this.Request.GetOwinContext();
            context.Authentication.SignOut("AuthCookie");
        }

        /// <summary>
        /// Gets the logins.
        /// </summary>
        /// <returns> The Logins</returns>
        public IEnumerable<Login> GetLogins()
        {
            return this.repository.GetAll();
        } 
    }
}
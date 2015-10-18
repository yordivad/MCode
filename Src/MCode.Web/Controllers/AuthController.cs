// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="AuthController.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The auth controller.</summary>
// ***********************************************************************

namespace MCode.WebUI.Controllers
{
    using System.Security.Claims;
    using System.Web;
    using System.Web.Mvc;

    using MCode.WebUI.Models;

    using Microsoft.Owin.Security;

    /// <summary>
    /// The authentication controller.
    /// </summary>
    [AllowAnonymous]
    public class AuthController : Controller
    {
        /// <summary>
        /// The login.
        /// </summary>
        /// <param name="returnUrl">The return URL.</param>
        /// <returns>The <see cref="ActionResult" />.</returns>
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            return this.View(new LoginModel
                                 {
                                     ReturnUrl = returnUrl
                                 });
        }

        /// <summary>
        /// Login the specified model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>the ActionResult.</returns>
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            if (!this.ModelState.IsValid)
            {
                return this.View(model);
            }

            if (model.Email == "yordivad@gmail.com")
            {
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
                return this.Redirect(this.GetUrl(model.ReturnUrl));
            }

            this.ModelState.AddModelError(string.Empty, "Invalid  email or password");
            return this.View(model);
        }

        /// <summary>
        /// Logout this instance.
        /// </summary>
        /// <returns> a redirect to login page.</returns>
        public ActionResult Logout()
        {
            var context = this.Request.GetOwinContext();
            context.Authentication.SignOut("AuthCookie");
            return this.Redirect(this.Url.Action("Login", "Auth"));
        }

        /// <summary>
        /// Get the URL.
        /// </summary>
        /// <param name="returnUrl">The return URL.</param>
        /// <returns>the final url</returns>
        private string GetUrl(string returnUrl)
        {
            return returnUrl ?? this.Url.Action("Index", "Home");
        }
    }
}
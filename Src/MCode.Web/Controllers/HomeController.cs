// ***********************************************************************
// Assembly         : WebUI
// ***********************************************************************
// <copyright file="HomeController.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The home controller.</summary>
// ***********************************************************************

namespace MCode.WebUI.Controllers
{
    using System.Web.Mvc;

    /// <summary>
    /// The home controller.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// The index.
        /// </summary>
        /// <returns>The <see cref="ActionResult" />.</returns>
        public ActionResult Index()
        {
            return this.View();
        }
    }
}
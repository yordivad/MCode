// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HomeController.cs" company="MCode">
//   Copyright (c) . All rights reserved.
// </copyright>
// <summary>
//   Class HomeController.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace MCode.WebUI.Controllers
{
    using Microsoft.AspNet.Mvc;

    /// <summary>
    ///     Class HomeController.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        ///     Indexes this instance.
        /// </summary>
        /// <returns>IActionResult.</returns>
        public IActionResult Index()
        {
            return this.View();
        }

        /// <summary>
        ///     Errors this instance.
        /// </summary>
        /// <returns>IActionResult.</returns>
        public IActionResult Error()
        {
            return this.View("~/Views/Shared/Error.cshtml");
        }
    }
}
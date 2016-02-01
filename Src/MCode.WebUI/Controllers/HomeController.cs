// ***********************************************************************
// Assembly         : MCode.WebUI
// ***********************************************************************
// <copyright file="HomeController.cs" company="">
//     Copyright (c) . All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************


namespace MCode.WebUI.Controllers
{
    using Microsoft.AspNet.Mvc;

    /// <summary>
    /// Class HomeController.
    /// </summary>
    public class HomeController : Controller
    {
        // GET: /<controller>/
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns>IActionResult.</returns>
        public IActionResult Index()
        {
            return this.View();
        }
    }
}
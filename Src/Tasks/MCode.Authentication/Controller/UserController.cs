// ***********************************************************************
// Assembly         : MCode.Authentication
// ***********************************************************************
// <copyright file="UserController.cs" company="Aurea">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>UserController.cs</summary>
// ***********************************************************************
namespace MCode.Authentication.Controller
{
    using System.Collections.Generic;
    using System.Web.Http;

    using MCode.Authentication.Model;

    /// <summary>
    /// Class UserController.
    /// </summary>
    [Authorize]
    public class UserController : ApiController
    {

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns>The list of users.</returns>
        public IEnumerable<User> GetUsers()
        {
            return new List<User> { new User { Name = "Roy", LastName = "Gonzalez" } };
        }
    }
}
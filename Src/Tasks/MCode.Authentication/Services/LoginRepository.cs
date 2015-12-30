// ***********************************************************************
// Assembly         : MCode.Authentication
// ***********************************************************************
// <copyright file="LoginRepository.cs" company="">
//     Copyright ©  2015
// </copyright>
// <summary>Class LoginRepository.</summary>
// ***********************************************************************
namespace MCode.Authentication.Services
{
    using System;
    using System.Collections.Generic;
    using Model;

    /// <summary>
    /// Class LoginRepository.
    /// </summary>
    public class LoginRepository : ILoginRepository 
    {
        /// <summary>
        /// Calls this instance.
        /// </summary>
        public void Call()
        {
            Console.WriteLine("Login Service Called");
        }

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns>IEnumerable&lt;Login&gt;.</returns>
        public IEnumerable<Login> GetAll()
        {
            return new List<Login> { new Login { Email = "yordiva@gmail.com", Password = "*****" } };
        }
    }
}
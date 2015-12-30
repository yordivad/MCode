// ***********************************************************************
// Assembly         : MCode.Authentication
// ***********************************************************************
// <copyright file="ILoginRepository.cs" company="">
//     Copyright ©  2015
// </copyright>
// <summary>The LoginRepository interface.</summary>
// ***********************************************************************

namespace MCode.Authentication.Services
{
    using System.Collections.Generic;
    using System.Security.Cryptography.X509Certificates;
    using Model;

    /// <summary>
    /// The LoginRepository interface.
    /// </summary>
    public interface ILoginRepository
    {
        /// <summary>
        /// Calls this instance.
        /// </summary>
        void Call();

        /// <summary>
        /// Gets all.
        /// </summary>
        /// <returns>The Logins</returns>
        IEnumerable<Login> GetAll();
    }
}
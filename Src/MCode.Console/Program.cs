// ***********************************************************************
// Assembly         : MCode.Console
// ***********************************************************************
// <copyright file="Program.cs" company="">
//     Copyright ©  2015
// </copyright>
// <summary>The program.</summary>
// ***********************************************************************

namespace MCode.Console
{
   
    using MCode.Host;

    using Microsoft.Owin.Hosting;

    /// <summary>
    /// The program.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// The main.
        /// </summary>
        /// <param name="args">The args.</param>
        private static void Main(string[] args)
        {
            var address = "http://localhost:9000";
            var app = WebApp.Start<Startup>(url: address);
            System.Console.ReadLine();
            app.Dispose();
        }
    }
}   
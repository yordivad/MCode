// ***********************************************************************
// Assembly         : MCode.Core
// ***********************************************************************
// <copyright file="Binding.cs" company="Aurea">
//     Copyright ©  Aurea 2010
// </copyright>
// <summary>Binding.cs</summary>
// ***********************************************************************

namespace MCode.Core
{
    using MCode.Core.Configuration;

    using Ninject;

    /// <summary>
    /// Class Binding.
    /// </summary>
    public class Binding
    {
        /// <summary>
        /// Initializes this instance.
        /// </summary>
        /// <returns>IKernel.</returns>
        public IKernel Initialize()
        {
            var kernel = new StandardKernel();
            kernel.Bind<IConfig>().To<Config>();
            kernel.Bind<IWebContext>().To<WebContext>();
            kernel.Bind<IContext>().To<Context>();
            kernel.Bind<IApiRunner>().To<ApiRunner>();
            kernel.Bind<IRunner>().To<Runner>();
            return kernel;
        }
    }
}
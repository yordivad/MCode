// ***********************************************************************
// Assembly         : MCode.Runner
// Author           : Roy
// Created          : 10-05-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="Catalog.cs" company="MCode">
//     © 2015 MCode
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.ComponentModel.Composition.Hosting;

namespace MCode.Host
{
    /// <summary>
    /// Class Catalog.
    /// </summary>
    public class Catalog
    {
        /// <summary>
        /// The catalog
        /// </summary>
        private readonly AggregateCatalog catalog;

        /// <summary>
        /// Initializes a new instance of the <see cref="Catalog"/> class.
        /// </summary>
        public Catalog()
        {
            this.catalog = new AggregateCatalog();
        }

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        public void Initialize()
        {
            this.catalog.Catalogs.Add(new AssemblyCatalog(typeof(Catalog).Assembly));
            var container = new CompositionContainer(this.catalog);
            container.SatisfyImportsOnce(null);
        }
    }
}
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
namespace MCode.Host
{
    using System.ComponentModel.Composition;
    using System.ComponentModel.Composition.Hosting;

    /// <summary>
    ///     Class Catalog.
    /// </summary>
    public class Catalog
    {
        /// <summary>
        ///     The catalog
        /// </summary>
        private readonly AggregateCatalog catalog;

        /// <summary>
        ///     Initializes a new instance of the <see cref="Catalog" /> class.
        /// </summary>
        public Catalog()
        {
            this.catalog = new AggregateCatalog();
        }

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        /// <returns>the CompositionContainer.</returns>
        public CompositionContainer Initialize()
        {
            this.catalog.Catalogs.Add(new AssemblyCatalog(typeof(Catalog).Assembly));
            this.catalog.Catalogs.Add(new DirectoryCatalog(@"./components"));
            return new CompositionContainer(this.catalog);
        }
    }
}
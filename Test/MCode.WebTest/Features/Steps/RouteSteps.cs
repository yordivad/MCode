// ***********************************************************************
// Assembly         : WebTest
// ***********************************************************************
// <copyright file="RouteSteps.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The route steps.</summary>
// ***********************************************************************
namespace MCode.WebTest.Features.Steps
{
    using System.Web.Routing;
    using MCode.WebUI;
    using NUnit.Framework;
    using TechTalk.SpecFlow;

    /// <summary>
    /// The route steps.
    /// </summary>
    [Binding]
    public sealed class RouteSteps
    {
        /// <summary>
        /// The routes
        /// </summary>
        private RouteCollection routes;

        /// <summary>
        /// The given a route collection.
        /// </summary>
        [Given(@"a route collection")]
        public void GivenARouteCollection()
        {
            this.routes = new RouteCollection();
        }

        /// <summary>
        /// The when call route register.
        /// </summary>
        [When(@"call route register")]
        public void WhenCallRouteRegister()
        {
            RouteConfig.RegisterRoutes(this.routes);
        }

        /// <summary>
        /// Then a route is added.
        /// </summary>
        /// <param name="table">The table.</param>
        [Then(@"a route is added:")]
        public void ThenARouteIsAdded(Table table)
        {
            var route = (Route)this.routes[1];
            Assert.AreEqual(table.Rows[0]["url"], route.Url);
        }

    }
}
// ***********************************************************************
// Assembly         : WebTest
// ***********************************************************************
// <copyright file="StartupSteps.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.WebTest.Features.Steps
{
    using MCode.WebUI;
    using Microsoft.Owin.Testing;
    using Owin;
    using TechTalk.SpecFlow;

    /// <summary>
    /// The startup steps.
    /// </summary>
    [Binding]
    public class StartupSteps
    {
        /// <summary>
        /// The startup
        /// </summary>
        private Startup startup;

        /// <summary>
        /// The application builder
        /// </summary>
        private IAppBuilder appBuilder;


        /// <summary>
        /// The server
        /// </summary>
        private TestServer server;

            /// <summary>
        /// Initializes this instance.
        /// </summary>
        [BeforeScenario]
        public void Initialize()
        {
            this.startup = new Startup();
                this.server = TestServer.Create(
                    app =>
                        {
                            app.Run(context => null);
                            this.appBuilder = app;
                        });
        }

        /// <summary>
        /// The given the app builder.
        /// </summary>
        [Given(@"The AppBuilder")]
        public void GivenTheAppBuilder()
        {
            
        }

        /// <summary>
        /// The when class initialize.
        /// </summary>
        [When(@"Class Initialize")]
        public void WhenClassInitialize()
        {
            this.startup.Configuration(this.appBuilder);
            var response = this.server.CreateRequest("/");
        }

        /// <summary>
        /// The then a cookie authentication is added.
        /// </summary>
        [Then(@"A cookie authentication is added")]
        public void ThenACookieAuthenticationIsAdded()
        {
            var request = this.server.CreateRequest("/");
        }
    }
}
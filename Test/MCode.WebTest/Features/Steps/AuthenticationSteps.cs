// ***********************************************************************
// Assembly         : WebTest
// ***********************************************************************
// <copyright file="AuthenticationSteps.cs" company="Aurea">
//     Copyright ©  2015
// </copyright>
// <summary>The authentication steps.</summary>
// ***********************************************************************
namespace MCode.WebTest.Features.Steps
{
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using FluentAssertions;
    using MCode.WebUI.Controllers;
    using MCode.WebUI.Models;
    using Moq;
    using TechTalk.SpecFlow;
    using TechTalk.SpecFlow.Assist;

    /// <summary>
    /// The authentication steps.
    /// </summary>
    [Binding]
    public sealed class AuthenticationSteps
    {
        /// <summary>
        /// The authentication controller
        /// </summary>
        private AuthController authController;

        /// <summary>
        /// The context mock
        /// </summary>
        private Mock<HttpContextBase> contextMock;

        /// <summary>
        /// The request mock
        /// </summary>
        private Mock<HttpRequestBase> requestMock;

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        [BeforeScenario]
        public void Initialize()
        {
            var routeData = new RouteData();
            this.contextMock = new Mock<HttpContextBase>();
            this.contextMock.Setup(c => c.Items)
                .Returns(new Dictionary<string, object> { { "owin.Environment", new Dictionary<string, object>() } });
            this.requestMock = new Mock<HttpRequestBase>();
            this.requestMock.Setup(c => c.RequestContext)
                .Returns(new RequestContext(this.contextMock.Object, routeData));
            this.contextMock.Setup(c => c.Request).Returns(this.requestMock.Object);
            this.authController = new AuthController();
            this.authController.ControllerContext = new ControllerContext(
                this.contextMock.Object, 
                routeData, 
                this.authController);
            var urlHelperMock = new Mock<UrlHelper>();
            urlHelperMock.Setup(c => c.Action(It.IsAny<string>(), It.IsAny<string>())).Returns("auth/login");
            this.authController.Url = urlHelperMock.Object;
        }

        /// <summary>
        /// Give a empty return URL.
        /// </summary>
        [Given(@"a emtpy return url")]
        public void GivenAEmptyReturnUrl()
        {
        }

        /// <summary>
        /// Whens the i request to login.
        /// </summary>
        [When(@"I request to login")]
        public void WhenIRequestToLogin()
        {
            ScenarioContext.Current["response"] = this.authController.Login(string.Empty);
        }

        /// <summary>
        /// Then the i got a response.
        /// </summary>
        [Then(@"i got a response")]
        public void ThenIGotAResponse()
        {
            var expected = new LoginModel { Email = null, Password = null, ReturnUrl = string.Empty };
            var response = (ViewResult)ScenarioContext.Current["response"];
            response.Model.ShouldBeEquivalentTo(expected);
        }

        /// <summary>
        /// Givens an login.
        /// </summary>
        /// <param name="table">The table.</param>
        [Given(@"an login:")]
        public void GivenAnLogin(Table table)
        {
            ScenarioContext.Current["login"] = table.CreateInstance<LoginModel>();
        }

        /// <summary>
        /// Whens the i execute login.
        /// </summary>
        [When(@"i execute Login")]
        public void WhenIExecuteLogin()
        {
            ScenarioContext.Current["redirect_login"] =
                this.authController.Login((LoginModel)ScenarioContext.Current["login"]);
        }

        /// <summary>
        /// Then the i get the response.
        /// </summary>
        [Then(@"i Get the response")]
        public void ThenIGetTheResponse()
        {
            var response = (RedirectResult)ScenarioContext.Current["redirect_login"];
            response.Url.Should().Be("home/index");
        }

        /// <summary>
        /// Give an invalid login.
        /// </summary>
        /// <param name="table">The table.</param>
        [Given(@"an invalidLogin:")]
        public void GivenAnInvalidLogin(Table table)
        {
            ScenarioContext.Current["login"] = table.CreateInstance<LoginModel>();
        }

        /// <summary>
        /// Then the i get the no authentication response.
        /// </summary>
        [Then(@"i Get the no auth response")]
        public void ThenIGetTheNoAuthResponse()
        {
            var response = (ViewResult)ScenarioContext.Current["redirect_login"];
            response.ViewData.ModelState[string.Empty].Errors[0].ErrorMessage.Should().Be("Invalid  email or password");
        }

        /// <summary>
        /// Give an invalid email.
        /// </summary>
        /// <param name="table">The table.</param>
        [Given(@"an invalidEmail:")]
        public void GivenAnInvalidEmail(Table table)
        {
            this.authController.ModelState.Add(string.Empty, new ModelState { Errors = { "Invalid Email" } });
            ScenarioContext.Current["login"] = table.CreateInstance<LoginModel>();
        }

        /// <summary>
        /// Then the i get authentication page.
        /// </summary>
        [Then(@"i Get auth page")]
        public void ThenIGetAuthPage()
        {
            var response = (ViewResult)ScenarioContext.Current["redirect_login"];
            response.ViewData.ModelState[string.Empty].Errors[0].ErrorMessage.Should().Be("Invalid Email");
        }

        /// <summary>
        /// When the i logout.
        /// </summary>
        [When(@"i logout")]
        public void WhenILogout()
        {
            ScenarioContext.Current["logout"] = this.authController.Logout();
        }

        /// <summary>
        /// Then the i get a redirect to login page.
        /// </summary>
        [Then(@"i get a redirect to login page")]
        public void ThenIGetARedirectToLoginPage()
        {
            var response = (RedirectResult)ScenarioContext.Current["logout"];
            response.Url.Should().Be("auth/login");
        }
    }
}
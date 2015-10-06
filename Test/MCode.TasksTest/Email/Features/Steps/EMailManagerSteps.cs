// ***********************************************************************
// Assembly         : MCode.TasksTest
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="EMailManagerSteps.cs" company="MCode">
//     ©  2015 MCode
// </copyright>
// <summary></summary>
// ***********************************************************************
namespace MCode.TasksTest.Email.Features.Steps
{
    using System.Collections.Generic;
    using Core.Configuration;
    using MCode.Email;
    using MCode.Email.Domain;
    using Moq;
    using TechTalk.SpecFlow;
    using TechTalk.SpecFlow.Assist;

    /// <summary>
    /// Class EMailManagerSteps.
    /// </summary>
    [Binding]
    public sealed class EMailManagerSteps
    {
        /// <summary>
        /// The context mock
        /// </summary>
        private Mock<IContext> contextMock;

        /// <summary>
        /// The manager
        /// </summary>
        private EmailManager manager;

        /// <summary>
        /// Initializes this instance.
        /// </summary>
        [BeforeScenario]
        public void Initialize()
        {
            this.manager = new EmailManager();
            this.contextMock = new Mock<IContext>();
        }

        /// <summary>
        /// Givens the configuration.
        /// </summary>
        /// <param name="table">The table.</param>
        [Given(@"the config")]
        public void GivenTheConfig(Table table)
        {
            var config = table.CreateInstance<EmailConfig>();

            var dictionary = this.CreateSettings(config);

            this.contextMock.Setup(c => c.Config).Returns(() => new Config { Settings = dictionary });
        }

        /// <summary>
        /// Creates the settings.
        /// </summary>
        /// <param name="config">The configuration.</param>
        /// <returns>System.Collections.Generic.Dictionary&lt;System.String, System.String&gt;.</returns>
        public Dictionary<string, string> CreateSettings(EmailConfig config)
        {
            return new Dictionary<string, string>
            {
                { "Server", config.Server },
                { "Port", config.Port.ToString() },
                { "EnableSsl", config.EnableSsl.ToString() },
                { "User", config.User },
                { "Password", config.Password }
            };
        }

        /// <summary>
        /// When the Initialize.
        /// </summary>
        [When(@"Initialize")]
        public void WhenInitialize()
        {
            ScenarioContext.Current.Pending();
        }

        /// <summary>
        /// Then the validate all settings are setup.
        /// </summary>
        [Then(@"Validate all settings are setup")]
        public void ThenValidateAllSettingsAreSetup()
        {
            ScenarioContext.Current.Pending();
        }
    }
}
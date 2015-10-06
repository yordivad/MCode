// ***********************************************************************
// Assembly         : MCode.RunnerTest
// Author           : Roy
// Created          : 10-06-2015
//
// Last Modified By : Roy
// Last Modified On : 10-06-2015
// ***********************************************************************
// <copyright file="RunnerSteps.cs" company="MCode">
//     © 2015 MCode
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Collections.Generic;
using FluentAssertions;
using MCode.Core;
using MCode.Core.Configuration;
using Moq;
using TechTalk.SpecFlow;

namespace MCode.CoreTest.Steps
{
    /// <summary>
    ///     Class RunnerSteps. This class cannot be inherited.
    /// </summary>
    [Binding]
    public sealed class RunnerSteps
    {
        /// <summary>
        ///     The mockTask
        /// </summary>
        private Mock<ITask> mockTask;

        /// <summary>
        /// The mock context
        /// </summary>
        private Mock<IContext> mockContext;


        private Mock<IWebContext> mockWebContext;

        /// <summary>
        ///     The runner
        /// </summary>
        private Runner runner;

        /// <summary>
        ///     Initializes this instance.
        /// </summary>
        [BeforeScenario]
        public void Initialize()
        {

            mockContext = new Mock<IContext>();
            mockWebContext = new Mock<IWebContext>();
            this.mockTask = new Mock<ITask>();
            this.mockTask.Setup(c=> c.Initialize(mockContext.Object)).Verifiable();
            this.runner = new Runner(mockContext.Object, mockWebContext.Object);
        }

        /// <summary>
        ///     Givens the give a new action.
        /// </summary>
        [Given(@"Give a new action")]
        public void GivenGiveANewAction()
        {
            var task = this.mockTask.Object;
            ScenarioContext.Current["task"] = new List<ITask>{task};
        }

        /// <summary>
        ///     Whens the i register in the catalog.
        /// </summary>
        [When(@"I Register in the catalog")]
        public void WhenIRegisterInTheCatalog()
        {
            this.runner.Task = (IEnumerable<ITask>)ScenarioContext.Current["task"];
        }

        /// <summary>
        /// Then the catalog needs to have action.
        /// </summary>
        /// <param name="actions">The actions.</param>
        [Then(@"The catalog needs to have (.*) action")]
        public void ThenTheCatalogNeedsToHaveAction(int actions)
        {
            this.runner.Task.Should().HaveCount(actions);
        }

        /// <summary>
        /// Whens the i start all modules.
        /// </summary>
        [When(@"I Start All Modules")]
        public void WhenIStartAllModules()
        {
            this.runner.Task = (IEnumerable<ITask>)ScenarioContext.Current["task"];
            this.runner.StartAll();
        }

        /// <summary>
        /// Thens the catalog need to verify initialization is called.
        /// </summary>
        [Then(@"The catalog need to Verify initialization is Called")]
        public void ThenTheCatalogNeedToVerifyInitializationIsCalled()
        {
            this.mockTask.Verify(c=> c.Initialize(It.IsAny<IWebContext>()));   
        }


    }
}
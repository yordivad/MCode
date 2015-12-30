// ***********************************************************************
// Assembly         : MCore.Workflow
// ***********************************************************************
// <copyright file="WorkflowController.cs" company="MCode">
//     Copyright ©  2015
// </copyright>
// <summary></summary>
// ***********************************************************************


namespace MCore.Workflow.Controller
{
    using System;
    using System.Collections.Generic;
    using System.Web.Http;

    using MCore.Workflow.Model;

    /// <summary>
    /// The workflow controller.
    /// </summary>
    [AllowAnonymous]
    public class WorkflowController : ApiController
    {

        /// <summary>
        /// Gets the graph.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Graph.</returns>
        public Graph GetGraph(Guid id)
        {

            var child1Id = Guid.NewGuid();
            var child2Id = Guid.NewGuid();
            var child3Id = Guid.NewGuid();

            return new Graph
                       {
                           id = Guid.NewGuid(),
                           Properties = new Property { Direction = "Down", Spacing = 40 },
                           Children =
                               new List<Child>
                                   {
                                       new Child { Id = child1Id, Width = 40, Height = 40 },
                                       new Child { Id = child2Id, Width = 40, Height = 40 },
                                       new Child { Id = child3Id, Width = 40, Height = 40, }
                                   },
                           Edges =
                               new List<Edge>
                                   {
                                       new Edge
                                           {
                                               Id = Guid.NewGuid(),
                                               Source = child1Id,
                                               Target = child2Id
                                           },
                                       new Edge
                                           {
                                               Id = Guid.NewGuid(),
                                               Source = child1Id,
                                               Target = child3Id
                                           },
                                       new Edge
                                           {
                                               Id = Guid.NewGuid(),
                                               Source = child2Id,
                                               Target = child3Id
                                           }
                                   }
                       };
        }

    }
}


using MCode.Core.Configuration;

namespace MCode.EMail
{
    using System.ComponentModel.Composition;
    using MCode.Core;

    [Export(typeof (ITask))]
    public class EmailManager : ITask
    {
        public void Initialize(IContext context)
        {
        }
    }
}
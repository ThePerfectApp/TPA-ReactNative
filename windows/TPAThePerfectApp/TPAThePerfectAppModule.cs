using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.TPAThePerfectApp
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class TPAThePerfectAppModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="TPAThePerfectAppModule"/>.
        /// </summary>
        internal TPAThePerfectAppModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "TPAThePerfectApp";
            }
        }
    }
}

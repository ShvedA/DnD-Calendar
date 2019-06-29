using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Dnd.Library.RNDndLibrary
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNDndLibraryModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNDndLibraryModule"/>.
        /// </summary>
        internal RNDndLibraryModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNDndLibrary";
            }
        }
    }
}

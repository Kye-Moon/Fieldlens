import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import {NativeModules} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let scriptHostname = "localhost";
const {scriptURL} = NativeModules.SourceCode;
[scriptHostname] = scriptURL.split('://')[1].split(':');
const reactotronConfig = {
    initiate: () => {
        Reactotron
            .setAsyncStorageHandler(AsyncStorage)
            .configure(
            {
                host: scriptHostname,
                port: 9090,
            }
        )
            .useReactNative()
            .use(reactotronRedux())
            .connect();
    },
};

export default reactotronConfig;
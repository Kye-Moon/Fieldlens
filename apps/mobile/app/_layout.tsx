import {Slot, SplashScreen} from "expo-router";
import {GluestackUIProvider, Text} from "@gluestack-ui/themed"
import {RecoilRoot} from "recoil";
import React, {Suspense, useEffect} from "react";
import {config} from "../config/gluestack-ui.config";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

import {registerRootComponent} from "expo";
import {ClerkProvider} from "@clerk/clerk-expo";
import {tokenCache} from "../lib/tokenCache";

const {App} = require('expo-router/_app');
registerRootComponent(App);

if (__DEV__) {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();

    const reactotron = require("../reactotron-config").default;
    reactotron.initiate()
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function Root() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);


    return (
        <GluestackUIProvider config={config}>
            {/*@ts-ignore*/}
            <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                <RecoilRoot>
                    <Suspense fallback={<Text>Loading...</Text>}>
                        <Slot/>
                    </Suspense>
                </RecoilRoot>
            </ClerkProvider>
        </GluestackUIProvider>
    )
}

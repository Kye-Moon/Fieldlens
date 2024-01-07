import {Redirect, Stack} from 'expo-router';
import {useRecoilValueLoadable} from "recoil";
import {accessTokenState} from "../../state/atoms";
import React from 'react';
import {PhotoOverlayProvider} from "../../context/PhotoOverlay";

export default function RootLayout() {
    const auth = useRecoilValueLoadable(accessTokenState); // TODO: This is just crude auth, we need to check if the token is valid
    if (!auth.getValue()) {
        return <Redirect href={'/sign-in'}/>
    }
    return (
        <PhotoOverlayProvider>
            <Stack screenOptions={{
                headerShown: false,
            }}/>
        </PhotoOverlayProvider>
    )
}


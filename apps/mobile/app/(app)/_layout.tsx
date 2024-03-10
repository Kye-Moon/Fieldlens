import {Redirect, Stack, useRouter} from 'expo-router';
import {useRecoilValueLoadable, useSetRecoilState} from "recoil";
import {accessTokenState} from "../../state/atoms";
import React from 'react';
import {PhotoOverlayProvider} from "../../context/PhotoOverlay";

export default function RootLayout() {
    const auth = useRecoilValueLoadable(accessTokenState); // TODO: This is just crude auth.ts, we need to check if the token is valid
    const router = useRouter();
    if (!auth.getValue()) {
        return <Redirect href={'/sign-in'}/>
    } else {
        return (
            <PhotoOverlayProvider>
                <Stack screenOptions={{
                    headerShown: false,
                }}/>
            </PhotoOverlayProvider>
        )
    }
}


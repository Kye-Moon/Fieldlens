import {Redirect, Stack} from 'expo-router';
import {useRecoilValueLoadable} from "recoil";
import {accessTokenState} from "../../state/atoms";
import React from 'react';

export default function RootLayout() {
    const auth = useRecoilValueLoadable(accessTokenState); // TODO: This is just crude auth, we need to check if the token is valid
    if (auth.getValue()) {
        console.log("Redirecting to home");
        return <Redirect href={'/(app)/home'}/>
    }
    return <RootLayoutNav/>;
}


function RootLayoutNav() {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}/>
            <Stack.Screen name="sign-up" options={{headerShown: false}}/>
            <Stack.Screen name="reset-password" options={{headerShown: true, headerTitle: "Reset Password"}}/>
        </Stack>
    );
}
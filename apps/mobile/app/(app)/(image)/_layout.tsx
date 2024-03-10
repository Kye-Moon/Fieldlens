import {Redirect, Stack} from 'expo-router';
import React from 'react';
import {useAuth} from "@clerk/clerk-expo";

export default function RootLayout() {
    const {isLoaded, isSignedIn} = useAuth()
    if (isLoaded && !isSignedIn) {
        return <Redirect href={'/sign-in'}/>
    }
    return (
        <Stack/>
    )
}


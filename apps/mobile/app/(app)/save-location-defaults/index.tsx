import {Button, Text} from "@gluestack-ui/themed";
import React, {Suspense} from "react";
import {StyleSheet} from "react-native";
import {router, Stack} from "expo-router";
import ScreenSection from "../../../components/ScreenSection";
import SaveLocationDefaultsForm from "./SaveLocationDefaultsForm";


export default function MarkupDefaultSettingsScreen() {

    return (
        <ScreenSection>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Save Location Defaults',
                    headerLeft: () => <Button variant={'link'}
                                              onPress={() => router.back()}><Text>Back</Text></Button>
                }}
            />
            <Suspense fallback={<Text>Loading...</Text>}>
                <SaveLocationDefaultsForm/>
            </Suspense>
        </ScreenSection>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        gap: 16,
        margin: 16,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    }
});
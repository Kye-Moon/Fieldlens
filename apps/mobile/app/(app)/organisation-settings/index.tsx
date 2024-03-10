import {Button, Text, View} from "@gluestack-ui/themed";
import React, {Suspense} from "react";
import {StyleSheet} from "react-native";
import {router, Stack} from "expo-router";
import OrganisationSettings from "./OrganisationSettings";

export default function OrganisationSettingsScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Organisation Settings',
                    headerLeft: () => <Button variant={'link'}
                                              onPress={() => router.back()}><Text>Back</Text></Button>
                }}
            />
            <Suspense fallback={<Text>Loading...</Text>}>
                <OrganisationSettings/>
            </Suspense>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'space-between',
    },

});
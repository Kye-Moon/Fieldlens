import {Button, Text, View} from "@gluestack-ui/themed";
import React, {Suspense} from "react";
import {StyleSheet} from "react-native";
import {router, Stack} from "expo-router";
import EditMarkUpSettings from "./EditMarkUpSettings";
export default function MarkupSettingsScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Markup Settings',
                    headerLeft: () => <Button variant={'link'}
                                              onPress={() => router.back()}><Text>Back</Text></Button>
                }}
            />
            <Suspense fallback={<Text>Loading...</Text>}>
                <EditMarkUpSettings/>
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
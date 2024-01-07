import {Button, Text, View} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {Stack, useRouter} from "expo-router";

export default function RecentScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{headerShown: true, headerLeft: () => <Button onPress={() => router.back()}><Text>Back</Text></Button>}}/>
            <Text>Recent</Text>
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
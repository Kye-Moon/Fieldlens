import {StyleSheet} from "react-native";
import {View} from "@gluestack-ui/themed";
import React from "react";

export default function ScreenSection({children}: {children: React.ReactNode}){
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})

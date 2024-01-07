import React from "react";
import {Heading, View} from "@gluestack-ui/themed";
import {StyleSheet} from "react-native";

interface ScreenContentSectionProps {
    children: React.ReactNode
    heading?: string
}
export default function ScreenContentSection({children, heading}:ScreenContentSectionProps){
    return (
        <View style={styles.content}>
            {heading && <Heading>{heading}</Heading>}
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: .2,
        shadowRadius: 1.41,
        margin: 12,
        padding: 12,
        borderRadius: 6,
    }
})

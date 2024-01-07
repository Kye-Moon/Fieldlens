import React from "react";
import {Text, View} from "@gluestack-ui/themed";
import {StyleSheet} from "react-native";

interface LabelAndValueProps {
    label?: string
    value?: string | null | React.ReactNode
}

export default function LabelAndValue({label, value}: LabelAndValueProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {value && typeof value !== 'string' ? value : <Text style={styles.value}>{value ? value : '-'}</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    }
})

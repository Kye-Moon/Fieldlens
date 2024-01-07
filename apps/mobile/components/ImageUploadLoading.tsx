import {Text, View} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import * as Progress from 'react-native-progress';

/**
 * An overlay that shows a loading indicator for image uploads
 */
export default function ImageUploadLoading() {
    return (
        <View style={styles.container}>
            <Text size={'xl'} color={'white'}>Uploading images...</Text>
            <Progress.Bar
                style={styles.progress}
                color={'white'}
                animated={true}
                indeterminate
                width={300}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        width: 300,
        color: 'white',
    }
})
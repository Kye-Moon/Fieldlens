import {Link, Stack, useNavigation, useRouter} from 'expo-router';
import {StyleSheet} from 'react-native';
import React from 'react';
import {Text, View} from "@gluestack-ui/themed";

export default function NotFoundScreen() {
    const route = useRouter();
    const navigation = useNavigation();
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <View style={styles.container}>
                <Text style={styles.title}>{JSON.stringify(navigation.getState())}</Text>

                <Link href="/home" style={styles.link}>
                    <Text style={styles.linkText}>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

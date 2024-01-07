import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Pressable} from "@gluestack-ui/themed";
import {useRouter} from "expo-router";

interface TabProps {
    title: string;
    onTabPress: () => void;
    isActive: boolean;
}


export const SidebarTabs = () => {
    const [markUpTabActive, setMarkUpTabActive] = useState(false);
    const router = useRouter();
    return (
        <View style={styles.sidebar}>
            <Pressable style={styles.tab} onPress={() => router.push('/markup-settings')}>
                <Text style={styles.text}>Markup</Text>
            </Pressable>
            <Pressable style={styles.tab} onPress={() => setMarkUpTabActive(!markUpTabActive)}>
                <Text style={styles.text}>Draw</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        right: 0,
        top: 100, // Adjust top as needed
        width: 60, // Adjust width as needed
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        width: 100,
        textAlign: 'center',
        color: 'black',
        transform: [{rotate: '90deg'}],
    },
});

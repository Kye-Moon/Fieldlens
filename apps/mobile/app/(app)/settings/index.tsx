import {Button, ButtonText, HStack, Pressable, ScrollView, Text, View} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {Stack, useRouter} from "expo-router";
import ScreenSection from "../../../components/ScreenSection";
import {useSetRecoilState} from "recoil";
import {accessTokenState} from "../../../state/atoms";
import {CameraIcon} from "lucide-react-native";

const settingsItems = [
    {
        title: 'Markup Defaults',
        icon: <CameraIcon size={24} color={'black'}/>,
        path: 'markup-defaults',
    },
]

export default function SettingsScreen() {
    const setToken = useSetRecoilState(accessTokenState)
    const router = useRouter();

    return (
        <ScreenSection>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Settings',
                    headerLeft: () => <Button variant={'link'}
                                              onPress={() => router.back()}><Text>Back</Text></Button>
                }}
            />
            <View style={styles.content}>
                <ScrollView>
                    {settingsItems.map((item, index) => (
                        <Pressable key={index} onPress={() => router.push(`/(app)/${item.path}`)}>
                            <HStack  style={styles.settingsItem}>
                                <Text size={'md'} fontWeight={'$semibold'}>{item.title}</Text>
                                {item.icon}
                            </HStack>
                        </Pressable>
                    ))}
                </ScrollView>
                <View style={styles.bottom}>
                    <Button variant={'outline'} onPress={() => setToken('')}>
                        <ButtonText>Logout</ButtonText>
                    </Button>
                </View>
            </View>
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
        borderBottomWidth: 0.2,
        paddingVertical: 6,
    }
});

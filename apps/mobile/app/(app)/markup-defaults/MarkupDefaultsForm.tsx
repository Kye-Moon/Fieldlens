import {StyleSheet} from "react-native";
import {HStack, ScrollView, Switch, Text, View} from "@gluestack-ui/themed";
import ColorPickerPopover from "../../../components/ColorPickerPopover";
import React, {useState} from "react";
import {useMutation, useSuspenseQuery} from "@apollo/client";
import {graphql} from "gql-types";

const defaultsQuery = graphql(`
    query MarkupDefaults {
        userMarkupDefaults {
            textBackgroundColor
            textColor
            id
            date
            time
            location
            logo
        }
    }
`);

const updateMarkupDefaultsMutation = graphql(`
    mutation UpdateMarkupDefaults($input: UpdateMarkupDefaultSettingInput!) {
        updateMarkupDefaultSetting(updateMarkupDefaultSettingInput: $input) {
            id
        }
    }`);


export default function MarkupDefaultsForm() {
    const {data} = useSuspenseQuery(defaultsQuery)
    const [updateDefaults] = useMutation(updateMarkupDefaultsMutation, {refetchQueries: ['MarkupDefaults']})
    const [defaultsId, setDefaultsId] = useState<string>(data.userMarkupDefaults?.id ?? '')
    const [date, setDate] = useState<boolean>(data.userMarkupDefaults?.date ?? false)
    const [time, setTime] = useState<boolean>(data.userMarkupDefaults?.time ?? false)
    const [location, setLocation] = useState<boolean>(data.userMarkupDefaults?.location ?? false)
    const [logo, setLogo] = useState<boolean>(data.userMarkupDefaults?.logo ?? false)
    const [textColor, setTextColor] = useState<string>(data.userMarkupDefaults?.textColor ?? '#000000')
    const [textBackgroundColor, setTextBackgroundColor] = useState<string>(data.userMarkupDefaults?.textBackgroundColor ?? '#ffffff')

    return (
        <View style={styles.content}>
            <ScrollView>
                <Text>Stamps</Text>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Date</Text>
                    <Switch value={date} onChange={async () => {
                        setDate(!date)
                        await updateDefaults({variables: {input: {id: defaultsId, date: !date}}})
                    }} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Time</Text>
                    <Switch value={time} onChange={async () => {
                        setTime(!time)
                        await updateDefaults({variables: {input: {id: defaultsId, time: !time}}})
                    }} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>GPS</Text>
                    <Switch value={location} onChange={async () => {
                        setLocation(!location)
                        await updateDefaults({variables: {input: {id: defaultsId, location: !location}}})
                    }} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Logo</Text>
                    <Switch value={logo} onChange={async () => {
                        setLogo(!logo)
                        await updateDefaults({variables: {input: {id: defaultsId, logo: !logo}}})
                    }} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Text color</Text>
                    <ColorPickerPopover
                        onChange={async (color) => {
                            setTextColor(color)
                            await updateDefaults({variables: {input: {id: defaultsId, textColor: color}}})
                        }}
                        colors={['#ffffff', '#000000', '#0039ff']}
                        selectedColor={textColor}
                    />
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Text background</Text>
                    <ColorPickerPopover
                        onChange={async (color) => {
                            setTextBackgroundColor(color)
                            await updateDefaults({variables: {input: {id: defaultsId, textBackgroundColor: color}}})
                        }}
                        colors={['#ffffff', '#000000']}
                        selectedColor={textBackgroundColor}
                    />
                </HStack>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: 16,
        margin: 16,
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    }
});
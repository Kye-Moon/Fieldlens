import {
    Badge,
    Button,
    ButtonText,
    Divider,
    HStack,
    Pressable,
    ScrollView,
    Switch,
    Text,
    Textarea,
    TextareaInput,
    View,
    VStack
} from "@gluestack-ui/themed";
import ColorPickerPopover from "../../../components/ColorPickerPopover";
import React from "react";
import {StyleSheet, TextInput} from "react-native";
import {usePhotoOverlay} from "../../../context/PhotoOverlay";

export default function EditMarkUpSettings() {
    const {
        showDate,
        toggleDate,
        showTime,
        toggleTime,
        showLocation,
        toggleLocation,
        showLogo,
        toggleLogo,
        textColor,
        handleTextColorChange,
        textBackgroundColor,
        handleTextBackgroundChange,
        restoreDefaults,
        description,
        handleDescriptionChange,
        tags,
        addTag,
        removeTag,
    } = usePhotoOverlay();

    const [tempTag, setTempTag] = React.useState('');

    return (
        <View style={styles.content}>
            <ScrollView>

                {/******Stamps*******/}
                <Text mt={'$2'}>Stamps</Text>
                <Divider/>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Date</Text>
                    <Switch value={showDate} onChange={toggleDate} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Time</Text>
                    <Switch value={showTime} onChange={toggleTime} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>GPS</Text>
                    <Switch value={showLocation} onChange={toggleLocation} size={'sm'}/>
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Logo</Text>
                    <Switch value={showLogo} onChange={toggleLogo} size={'sm'}/>
                </HStack>

                {/******Tags*******/}
                <Text mt={'$4'}>Tags</Text>
                <Divider mb={'$4'}/>
                <VStack>
                    <HStack style={styles.tags} space={'sm'}>
                        {tags.map((tag, index) => (
                                <Pressable onPress={() => removeTag(index)}>
                                    <Badge key={index} bg={textBackgroundColor} style={styles.tag}>
                                        <Text size={'sm'} fontWeight={'$semibold'} color={textColor}>{tag}</Text>
                                    </Badge>
                                </Pressable>
                            )
                        )}
                    </HStack>
                    <HStack>
                        <TextInput
                            value={tempTag}
                            onChange={(e) => setTempTag(e.nativeEvent.text)}
                            style={styles.textInput}
                        />
                        <Button onPress={() => {
                            if (tempTag === '') return;
                            addTag(tempTag)
                            setTempTag('')
                        }} size={'sm'}>
                            <ButtonText>Add</ButtonText>
                        </Button>
                    </HStack>
                    <Text size={'xs'}>Tap tags to remove</Text>
                </VStack>

                {/******Description*******/}
                <Text mt={'$4'}>Description</Text>
                <Divider mb={'$4'}/>
                <Textarea
                    size="md"
                    w="$full"
                    h={'$20'}
                >
                    <TextareaInput
                        placeholder="Your text goes here..."
                        onChange={(e)=>{handleDescriptionChange(e)}}
                    />
                </Textarea>


                {/******Styles*******/}
                <Text mt={'$4'}>Styles</Text>
                <Divider/>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Text color</Text>
                    <ColorPickerPopover
                        onChange={async (color) => {
                            handleTextColorChange(color)
                        }}
                        colors={['#ffffff', '#000000', '#0039ff']}
                        selectedColor={textColor}
                    />
                </HStack>
                <HStack style={styles.settingsItem}>
                    <Text size={'md'} fontWeight={'$semibold'}>Text background</Text>
                    <ColorPickerPopover
                        onChange={async (color) => {
                            handleTextBackgroundChange(color)
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
    },
    textInput: {
        height: 35,
        width: "75%",
        marginRight: 20,
        borderRadius: 4,
        borderWidth: 1
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: "3%",
    },
    tag: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 4,
        padding: 1,
    }
});
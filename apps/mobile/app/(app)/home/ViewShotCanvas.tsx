import {StyleSheet, View} from "react-native";
import ViewShot from "react-native-view-shot";
import {Badge, Image, Text, VStack} from "@gluestack-ui/themed";
import React from "react";
import {usePhotoOverlay} from "../../../context/PhotoOverlay";

interface ViewShotCanvasProps {
    imageURI: string
    ref: React.RefObject<ViewShot>
}
const testTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9'];

export const ViewShotCanvas = React.forwardRef(({imageURI}: ViewShotCanvasProps, ref: React.Ref<ViewShot>) => {
    const {
        showDate,
        showTime,
        showLocation,
        showLogo,
        textColor,
        textBackgroundColor,
        tags ,
        description,
    } = usePhotoOverlay();

    return (
        <ViewShot style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}
                  ref={ref} options={{fileName: "Your-File-Name", format: "jpg", quality: 0.9}}>
            <Image
                alt={'Image'}
                source={{uri: imageURI}}
                style={styles.imageStyle}
                resizeMode="cover"
            />
            <View style={styles.container}>
                <VStack style={styles.tags} space={'sm'}>
                    {tags.map((tag, index) => (
                            <Badge key={index} bg={textBackgroundColor} style={styles.tag}>
                                <Text size={'sm'}  fontWeight={'$semibold'} color={textColor}>{tag}</Text>
                            </Badge>
                        )
                    )}
                </VStack>

                {showDate && (
                    <Text color={textColor}>
                        {new Date().toLocaleDateString()}
                    </Text>
                )}
                {showTime && (
                    <Text color={textColor}>
                        {new Date().toLocaleTimeString()}
                    </Text>
                )}
                {showLocation && (
                    <Text color={textColor}>
                        Location
                    </Text>
                )}
                {showLogo && (
                    <Image
                        alt={'Image'}
                        source={{uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'}}
                        resizeMode="contain"
                    />
                )}
                {description && (
                    <Text color={textColor}>
                        {description}
                    </Text>
                )}
            </View>
        </ViewShot>
    )
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 30,
        left: 20,
        zIndex: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    dateText: {
        position: 'absolute',

        fontSize: 0,
        fontWeight: 'bold',
        padding: 10,
        flexDirection: 'column',
        flex: 1,
        zIndex: 1,
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
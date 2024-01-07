import {Pressable, Text, useToast, View} from "@gluestack-ui/themed";
import React, {useEffect, useRef, useState} from "react";
import {Stack, useRouter} from "expo-router";
import {Platform, StyleSheet, TouchableOpacity} from "react-native";
import {CameraIcon, SaveIcon, XIcon} from "lucide-react-native";
import {AutoFocus, Camera, CameraCapturedPicture, CameraType} from 'expo-camera';
import {PinchGestureHandler} from "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import {SidebarTabs} from "../../../components/ImageSideTabs";
import {ViewShotCanvas} from "./ViewShotCanvas";
import {usePhotoOverlay} from "../../../context/PhotoOverlay";
import {showSuccessToast} from "../../../lib/toasts";

export default function HomePage() {
    const [image, setImage] = React.useState<CameraCapturedPicture | undefined>(undefined);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
    const camera = useRef<Camera>(null)
    const ref = useRef<ViewShot>(null);
    const toast = useToast();
    const [zoom, setZoom] = useState(0)
    const {restoreDefaults} = usePhotoOverlay();
    const onSaved = async () => {
        if (ref && ref.current && ref.current.capture) {
            const uri = await ref.current.capture()
            await MediaLibrary.saveToLibraryAsync(uri);
            setImage(undefined)
            restoreDefaults()
            showSuccessToast({message: 'Image Saved',toast: toast});
        }
    }

    const handleZoom = (event: any) => {
        var scale = event.nativeEvent.scale
        var velocity = event.nativeEvent.velocity / 20

        let newZoom =
            velocity > 0
                ? zoom + scale * velocity * (Platform.OS === "ios" ? 0.01 : 25)
                : zoom -
                scale * Math.abs(velocity) * (Platform.OS === "ios" ? 0.02 : 50);

        if (newZoom < 0) newZoom = 0;
        else if (newZoom > 0.5) newZoom = 0.5;
        setZoom(newZoom)
    }

    const takePhoto = async () => {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync()
            setImage(photo)
        }
    }

    useEffect(() => {
        if (!permission) {
            requestPermission().catch((e) => console.log(e))
        }
        if (!permissionResponse) {
            requestMediaPermission().catch((e) => console.log(e))
        }
    }, [permission, requestPermission])


    if (camera == null) return <Text>No Device</Text>

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            {image ? (
                <>
                    <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <SidebarTabs/>
                        <Pressable style={styles.dismissButton} onPress={() => setImage(undefined)}>
                            <XIcon color={'white'}/>
                        </Pressable>
                        <ViewShotCanvas imageURI={image.uri} ref={ref}/>
                        <Pressable style={styles.saveButton} onPress={() => onSaved()}>
                            <Text fontWeight={'$bold'} color={'$white'}>Save</Text>
                            <SaveIcon color={'white'}/>
                        </Pressable>
                    </View>
                </>
            ) : (
                <>
                    <PinchGestureHandler onGestureEvent={handleZoom}>
                        <Camera
                            ref={camera}
                            style={{flex: 1}}
                            type={type}
                            zoom={zoom}
                            autoFocus={AutoFocus.on}
                        />
                    </PinchGestureHandler>
                    <View style={styles.floatingTabs}>
                        <CustomBottomTabs takePhoto={takePhoto}/>
                    </View>
                </>
            )}

        </>
    )
}

export const CustomBottomTabs = ({takePhoto}: { takePhoto: () => void }) => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* Home Tab */}
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/recent')}>
                <Text style={styles.text}>Recent</Text>
            </TouchableOpacity>

            {/* Camera Tab */}
            <TouchableOpacity style={styles.cameraTab} onPress={() => takePhoto()}>
                <CameraIcon color='black'/>
            </TouchableOpacity>

            {/* Settings Tab */}
            <TouchableOpacity style={styles.tab} onPress={() => router.push('/settings')}>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "30%",
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10
    },
    cameraTab: {
        width: 80,
        height: 80,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30
    },
    text: {
        fontSize: 18,
        color: 'black'
    },
    layout: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    floatingTabs: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Make sure tabs are above other content
    },
    dismissButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 3,
        borderRadius: 10,
        color: 'white',
        backgroundColor: 'rgba(225,225,225,0.5)',
        zIndex: 1,
    },
    saveButton: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 40,
        right: 20,
        padding: 6,
        width: 90,
        justifyContent: 'space-between',
        borderRadius: 10,
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        zIndex: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
});
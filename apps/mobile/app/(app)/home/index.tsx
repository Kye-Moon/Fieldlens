import { Pressable, Spinner, Text, useToast, View } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CameraIcon, SaveIcon, XIcon } from "lucide-react-native";
import { AutoFocus, Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { PinchGestureHandler } from "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { usePhotoOverlay } from "../../../context/PhotoOverlay";
import useDropboxUpload from "../../../hooks/useDropboxUpload";
import { showSuccessToast } from "../../../lib/toasts";
import { TabsAndCameraSection } from "./TabsAndCameraSection";
import { handleZoom } from "../../../lib/utils";
import { useSaveImage } from "../../../hooks/useSaveImage";


export default function HomePage() {
  const { handleSaveImage } = useSaveImage();
  const { restoreDefaults } = usePhotoOverlay();

  const [savingImage, setSavingImage] = useState(false);
  const [image, setImage] = React.useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const [type, setType] = useState(CameraType.back);
  const camera = useRef<Camera>(null);
  const ref = useRef<ViewShot>(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const { uploadImage } = useDropboxUpload();

  const toast = useToast();
  const [zoom, setZoom] = useState(0);
  const reset = () => {
    restoreDefaults();
    setSavingImage(false);
    setImage(undefined);
  };
  const onSaved = async () => {
    setSavingImage(true);
    if (ref && ref.current && ref.current.capture) {
      const uri = await ref.current.capture();
      await handleSaveImage(uri);
    }
    reset();
  };

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      setImage(photo);
    }
  };

  useEffect(() => {
    if (!permission) {
      requestPermission().catch((e) => console.log(e));
    }
    if (!permissionResponse) {
      requestMediaPermission().catch((e) => console.log(e));
    }
  }, [permission, requestPermission]);

  if (camera == null) return <Text>No Device</Text>;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {image ? (
        <>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Pressable
              style={styles.dismissButton}
              onPress={() => setImage(undefined)}
            >
              <XIcon color={"black"} />
            </Pressable>
            <TabsAndCameraSection imageURI={image.uri} ref={ref} />
            <Pressable style={styles.saveButton} onPress={() => onSaved()}>
              {savingImage
                ? <Spinner size={"small"} color={"white"} />
                : <Text fontWeight={"$bold"} color={"$white"}>
                  Save
                </Text>
              }

              <SaveIcon color={"white"} />
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <PinchGestureHandler onGestureEvent={(event) => handleZoom({ event: event, zoom: zoom, setZoom: setZoom })}>
            <Camera
              ref={camera}
              style={{ flex: 1 }}
              type={type}
              zoom={zoom}
              autoFocus={AutoFocus.on}
            />
          </PinchGestureHandler>
          <View style={styles.floatingTabs}>
            <CustomBottomTabs takePhoto={takePhoto} />
          </View>
        </>
      )}
    </>
  );
}

export const CustomBottomTabs = ({ takePhoto }: { takePhoto: () => void }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.push("/recent")}
      >
        <Text style={styles.text}>Recent</Text>
      </TouchableOpacity>

      {/* Camera Tab */}
      <TouchableOpacity style={styles.cameraTab} onPress={() => takePhoto()}>
        <CameraIcon color="white" size={32} />
      </TouchableOpacity>

      {/* Settings Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white"
  },
  cameraTab: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    borderWidth: 1,
    borderColor: "white"
  },
  text: {
    fontSize: 18,
    opacity: 1,
    color: "#fff",
    fontWeight: "bold"
  },
  floatingTabs: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1 // Make sure tabs are above other content
  },
  dismissButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 3,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    zIndex: 1
  },
  saveButton: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    bottom: 40,
    right: 20,
    padding: 6,
    width: 90,
    justifyContent: "space-between",
    borderRadius: 10,
    color: "black",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    zIndex: 1
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    position: "absolute"
  }
});

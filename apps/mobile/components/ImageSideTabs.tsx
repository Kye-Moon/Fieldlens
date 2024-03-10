import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Pressable} from "@gluestack-ui/themed";
import {useRouter} from "expo-router";
import {SaveIcon, TrashIcon, UndoIcon} from "lucide-react-native";

interface TabProps {
    drawingEnabled: boolean;
    setDrawingEnabled: (enabled: boolean) => void;
    color: string;
    setColor: () => void;
    clearPaths: () => void;
    removeLastPath: () => void;
}


export const SidebarTabs = ({
                                drawingEnabled,
                                setDrawingEnabled,
                                removeLastPath,
                                clearPaths,
                                setColor,
                                color
                            }: TabProps) => {
    const router = useRouter();
    return (
        <View style={styles.sidebar}>
            <Pressable style={styles.markupTab} onPress={() => router.push("/markup-settings")}>
                <Text style={styles.text}>Markup</Text>
            </Pressable>

            {drawingEnabled ? (
                    <Pressable style={styles.colorTab} onPress={() => setDrawingEnabled(!drawingEnabled)}>
                        <SaveIcon size={24} color={"white"}/>
                    </Pressable>
                )
                : (
                    <Pressable style={styles.drawTab}
                               onPress={() => setDrawingEnabled(!drawingEnabled)}>
                        <Text style={styles.text}>Draw</Text>
                    </Pressable>
                )
            }

            {drawingEnabled && (
                <View>
                    <Pressable bgColor={getHexColor(color)} style={styles.colorTab} onPress={() => setColor()}>
                    </Pressable>
                    <Pressable bgColor={"#fff"} style={styles.colorTab} onPress={() => removeLastPath()}>
                        <UndoIcon size={24} color={"black"}/>
                    </Pressable>
                    <Pressable bgColor={"#fff"} style={styles.colorTab} onPress={() => clearPaths()}>
                        <TrashIcon size={24} color={"black"}/>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: "absolute",
        right: 0,
        top: 100, // Adjust top as needed
        width: 60, // Adjust width as needed
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 1
    },
    markupTab: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 100,
        backgroundColor: "rgb(0,0,0,0.5)",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    drawTab: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 70,
        backgroundColor: "rgb(0,0,0,0.5)",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    colorTab: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: "grey"
    },
    text: {
        fontSize: 18,
        width: 100,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        transform: [{rotate: "90deg"}]
    }
});

const getHexColor = (color: string) => {
    switch (color) {
        case "red":
            return "#d50000";
        case "green":
            return "#00c853";
        case "blue":
            return "#2962ff";
        case "yellow":
            return "#ffab00";
        case "black":
            return "#000000";
        case "white":
            return "#ffffff";
        default:
            return "#d50000";
    }
};

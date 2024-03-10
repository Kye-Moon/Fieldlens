import ViewShot from "react-native-view-shot";
import { SidebarTabs } from "../../../components/ImageSideTabs";
import { ViewShotCanvas } from "./ViewShotCanvas";
import React from "react";
import { useDraw } from "../../../hooks/useDraw";

interface TabsAndCameraSectionProps {
  imageURI: string;
  ref: React.RefObject<ViewShot>;

}

export const TabsAndCameraSection = React.forwardRef(({ imageURI }: TabsAndCameraSectionProps, ref: React.Ref<ViewShot>) => {
  const { onTouchMove, onTouchEnd, currentPath, paths, clearPaths, removeLastPath } = useDraw();
  const [enableDrawing, setEnableDrawing] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("red");
  const [availableColors, setAvailableColors] = React.useState<string[]>(["red", "blue", "green", "black", "white"]);

  const handleNextColor = () => {
    const currentColorIndex = availableColors.indexOf(color);
    const nextColorIndex = currentColorIndex + 1;
    if (nextColorIndex === availableColors.length) {
      setColor(availableColors[0]);
    } else {
      setColor(availableColors[nextColorIndex]);
    }
  }

  return (
    <>
      <SidebarTabs
        color={color}
        setColor={handleNextColor}
        clearPaths={clearPaths}
        removeLastPath={removeLastPath}
        drawingEnabled={enableDrawing}
        setDrawingEnabled={setEnableDrawing}
      />
      <ViewShotCanvas
        strokeColor={color}
        onTouchMove={enableDrawing ? onTouchMove : () => {}}
        onTouchEnd={enableDrawing ? onTouchEnd : () => {}}
        currentPath={currentPath}
        paths={paths}
        imageURI={imageURI}
        ref={ref}
        enableDrawing={enableDrawing}
      />
    </>
  );
});
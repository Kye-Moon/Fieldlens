import { GestureResponderEvent } from "react-native";
import { useState } from "react";

export const useDraw = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[][]>([]);

  /**
   * When the user is touching the screen, we add the current point to the current path
   * @param event
   */
  const onTouchMove = (event: GestureResponderEvent) => {
    const newPath = [...currentPath];
    //get current user touches position
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    // create new point
    const newPoint = `${newPath.length === 0 ? "M" : ""}${locationX.toFixed(
      0
    )},${locationY.toFixed(0)} `;

    // add the point to older points
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  /**
   * When the user stops touching the screen, we add the current path to the paths array
   * @param event
   */
  const onTouchEnd = (event: GestureResponderEvent) => {
    const currentPaths = [...paths];
    currentPaths.push(currentPath);
    setPaths(currentPaths);
    setCurrentPath([]);
  };

  const removeLastPath = () => {
    const currentPaths = [...paths];
    currentPaths.pop();
    setPaths(currentPaths);
  };

  const clearPaths = () => {
    setPaths([]);
  };

  return { onTouchMove, onTouchEnd, currentPath, paths, removeLastPath, clearPaths };
};

import {View} from "react-native";
import Svg, {Path} from "react-native-svg";
import React from "react";

interface DrawingCanvasProps {
  onTouchMove: (event: any) => void;
  onTouchEnd: (event: any) => void;
  currentPath: string[];
  paths: string[][];
  color: string;
}

export default function DrawingCanvas({ onTouchMove, onTouchEnd, currentPath, paths, color='red' }: DrawingCanvasProps) {

  return (
    <View
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
      <Svg height={"100%"} width={"100%"}>
        <Path
          d={currentPath.join("")}
          stroke={color}
          fill={"transparent"}
          strokeWidth={2}
          strokeLinejoin={"round"}
          strokeLinecap={"round"}
        />
        {paths.length > 0 &&
          paths.map((item, index) => (
            <Path
              key={index}
              d={item.join("")}
              stroke={color}
              fill={"transparent"}
              strokeWidth={2}
              strokeLinejoin={"round"}
              strokeLinecap={"round"}
            />
          ))}
      </Svg>
    </View>
  );
}
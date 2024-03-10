import {Platform} from "react-native";

export const truncate = (str: string, n: number) => {
  return str.length > n ? str.substring(0, n - 1) + "..." : str;
};

export function enumToSentenceCase(enumValue: string) {
  // Split the input string by underscores
  const words = enumValue.split("_");

  // Capitalize the first letter of each word and convert the rest to lowercase
  const sentenceCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together with a space between them
  return sentenceCaseWords.join(" ");
}

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "IN_PROGRESS":
      return "blue";
    case "FINISHED":
      return "green";
    case "NOT_STARTED":
      return "yellow";
  }
};

export const validateDropBoxPath = (event: any, form: any): boolean => {
  if (event.nativeEvent.text.length === 0) {
    form.setError("path", { message: "Path is required" });
    return false;
  }
  if (event.nativeEvent.text[0] !== "/") {
    form.setError("path", { message: "Path must start with /" });
    return false;
  }
  if (event.nativeEvent.text[event.nativeEvent.text.length - 1] === "/") {
    form.setError("path", { message: "Path must not end with /" });
    return false;
  }
  return true;
};


interface HandleZoomProps {
  event: any;
  zoom: number;
  setZoom: (zoom: number) => void;
}
export const handleZoom = ({ event, zoom, setZoom }: HandleZoomProps) => {
  var scale = event.nativeEvent.scale;
  var velocity = event.nativeEvent.velocity / 20;

  let newZoom =
    velocity > 0
      ? zoom + scale * velocity * (Platform.OS === "ios" ? 0.01 : 25)
      : zoom -
      scale * Math.abs(velocity) * (Platform.OS === "ios" ? 0.02 : 50);

  if (newZoom < 0) newZoom = 0;
  else if (newZoom > 0.5) newZoom = 0.5;
  setZoom(newZoom);
};

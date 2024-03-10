import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useRecoilValue } from "recoil";
import {
  photoOverlayDefaultsSelector
} from "../state/selectors";

// Define the types for the context
interface PhotoOverlayContextType {
  showDate: boolean;
  showTime: boolean;
  showLocation: boolean;
  showLogo: boolean;
  tags: string[];
  description: string;
  textBackgroundColor: string;
  textColor: string;
  toggleDate: () => void;
  toggleTime: () => void;
  toggleLocation: () => void;
  toggleLogo: () => void;
  addTag: (tag: string) => void;
  removeTag: (tagToRemove: number) => void;
  handleDescriptionChange: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  handleTextColorChange: (color: SetStateAction<string>) => void;
  handleTextBackgroundChange: (color: SetStateAction<string>) => void;
  restoreDefaults: () => void;
}

// Create the context
const PhotoOverlayContext = createContext<PhotoOverlayContextType | undefined>(undefined);

// Provider component
export const PhotoOverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    showDateDefault,
    showLogoDefault,
    showTimeDefault,
    showLocationDefault,
    textBackgroundColourDefault,
    textColourDefault
  } = useRecoilValue(photoOverlayDefaultsSelector);

  // State for each toggle
  const [showDate, setShowDate] = useState(showDateDefault ?? false);
  const [showTime, setShowTime] = useState(showTimeDefault ?? false);
  const [showLocation, setShowLocation] = useState(showLocationDefault ?? false);
  const [showLogo, setShowLogo] = useState(showLogoDefault ?? false);
  const [textBackgroundColor, setTextBackgroundColor] = useState(textBackgroundColourDefault ?? false);
  const [textColor, setTextColor] = useState(textColourDefault ?? false);

  // State for tags and description
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const restoreDefaults = () => {
    setShowDate(showDateDefault ?? false);
    setShowTime(showTimeDefault ?? false);
    setShowLocation(showLocationDefault ?? false);
    setShowLogo(showLogoDefault ?? false);
    setTextBackgroundColor(textBackgroundColourDefault ?? "#ffffff");
    setTextColor(textColourDefault ?? "#000000");
    setTags([]);
    setDescription("");
  };

  useEffect(() => {
    restoreDefaults();
  }, [showDateDefault, showTimeDefault, showLocationDefault, showLogoDefault, textBackgroundColourDefault, textColourDefault]);

  // Handlers for toggles
  const toggleDate = () => setShowDate(!showDate);
  const toggleTime = () => setShowTime(!showTime);
  const toggleLocation = () => setShowLocation(!showLocation);
  const toggleLogo = () => setShowLogo(!showLogo);

  // Handlers for tags and description
  const addTag = (tag: string) => setTags([...tags, tag]);
  const removeTag = (tagToRemove: number) => setTags(tags.filter((_, index) => index !== tagToRemove));
  const handleDescriptionChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => setDescription(event.nativeEvent.text);

  // Handler for text color picker
  const handleTextColorChange = (color: SetStateAction<string>) => setTextColor(color);
  const handleTextBackgroundChange = (color: SetStateAction<string>) => setTextBackgroundColor(color);

  return (
    <PhotoOverlayContext.Provider value={{
      showDate,
      showTime,
      showLocation,
      showLogo,
      tags,
      description,
      textBackgroundColor,
      textColor,
      toggleDate,
      toggleTime,
      toggleLocation,
      toggleLogo,
      addTag,
      removeTag,
      handleDescriptionChange,
      handleTextColorChange,
      handleTextBackgroundChange,
      restoreDefaults
    }}>
      {children}
    </PhotoOverlayContext.Provider>
  );
};

// Hook to use the context
export const usePhotoOverlay = (): PhotoOverlayContextType => {
  const context = useContext(PhotoOverlayContext);
  if (context === undefined) {
    throw new Error("usePhotoOverlay must be used within a PhotoOverlayProvider");
  }
  return context;
};

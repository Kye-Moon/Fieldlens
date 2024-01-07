import React, {createContext, useContext, useState, useEffect, SetStateAction} from 'react';
import {graphql} from 'gql-types';
import {useSuspenseQuery} from '@apollo/client';
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

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

// Define the defaults query
const defaultsQuery = graphql(`
    query MarkupDefaults {
        userMarkupDefaults {
            textBackgroundColor
            textColor
            id
            date
            time
            location
            logo
        }
    }
`);

// Provider component
export const PhotoOverlayProvider = ({children}: { children: React.ReactNode }) => {
    const {data} = useSuspenseQuery(defaultsQuery);

    // State for each toggle
    const [showDate, setShowDate] = useState(data.userMarkupDefaults?.date ?? false);
    const [showTime, setShowTime] = useState(data.userMarkupDefaults?.time ?? false);
    const [showLocation, setShowLocation] = useState(data.userMarkupDefaults?.location ?? false);
    const [showLogo, setShowLogo] = useState(data.userMarkupDefaults?.logo ?? false);

    // State for tags and description
    const [tags, setTags] = useState<string[]>([]);
    const [description, setDescription] = useState('');

    // State for description background toggle and text color
    const [textBackgroundColor, setTextBackgroundColor] = useState<string>(data.userMarkupDefaults?.textBackgroundColor ?? '#ffffff');
    const [textColor, setTextColor] = useState<string>(data.userMarkupDefaults?.textColor ?? '#000000'); // default black

    //UseEffect to set the defaults
    useEffect(() => {
        restoreDefaults();
    }, [data.userMarkupDefaults]);

    const restoreDefaults = () => {
        setShowDate(data.userMarkupDefaults?.date ?? false);
        setShowTime(data.userMarkupDefaults?.time ?? false);
        setShowLocation(data.userMarkupDefaults?.location ?? false);
        setShowLogo(data.userMarkupDefaults?.logo ?? false);
        setTextBackgroundColor(data.userMarkupDefaults?.textBackgroundColor ?? '#ffffff');
        setTextColor(data.userMarkupDefaults?.textColor ?? '#000000');
        setTags([]);
        setDescription('');
    }


    // Handlers for toggles
    const toggleDate = () => setShowDate(!showDate);
    const toggleTime = () => setShowTime(!showTime);
    const toggleLocation = () => setShowLocation(!showLocation);
    const toggleLogo = () => setShowLogo(!showLogo);

    // Handlers for tags and description
    const addTag = (tag: string) => setTags([...tags, tag]);
    const removeTag = (tagToRemove: number) => setTags(tags.filter((_, index) => index !== tagToRemove));
    const handleDescriptionChange = (event:  NativeSyntheticEvent<TextInputChangeEventData>) => setDescription(event.nativeEvent.text);

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
        throw new Error('usePhotoOverlay must be used within a PhotoOverlayProvider');
    }
    return context;
};

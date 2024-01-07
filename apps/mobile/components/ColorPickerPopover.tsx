import React, {useState} from "react";
import {Button, HStack, Popover, PopoverBackdrop, PopoverBody, PopoverContent} from "@gluestack-ui/themed";
import {PaintBucketIcon} from "lucide-react-native";
import {StyleSheet} from "react-native";


interface ColorPickerPopoverProps {
    colors: string[]
    selectedColor: string
    onChange: (color: string) => void
}

export default function ColorPickerPopover({onChange, colors, selectedColor}: ColorPickerPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const getIconColor = () => {
        switch (selectedColor) {
            case '#ffffff':
                return 'black'
            case '#000000':
                return 'white'
            default:
                return 'white'
        }
    }

    return (
        <Popover
            isOpen={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            placement="bottom"
            size="xs"
            trigger={(triggerProps) => {
                return (
                    <Button backgroundColor={selectedColor} size={'xs'} variant={'outline'} {...triggerProps}>
                        <PaintBucketIcon size={18} color={getIconColor()}/>
                    </Button>
                )
            }}>
            <PopoverBackdrop/>
            <PopoverContent>
                <PopoverBody contentContainerStyle={styles.container}>
                    <HStack gap={22}>
                        {colors.map((color, index) => (
                            <Button
                                key={index}
                                variant={'outline'}
                                onPress={() => onChange(color)}
                                size={'xs'}
                                style={{backgroundColor: color}}
                            />
                        ))}
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 6
    },
})
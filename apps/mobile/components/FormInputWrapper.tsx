import React, {JSX} from 'react';
import {
    FormControl,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from "@gluestack-ui/themed";
import {ControllerRenderProps, FieldValues, UseFormStateReturn} from "react-hook-form";

interface FormInputWrapperProps {
    children: JSX.Element
    formState: UseFormStateReturn<FieldValues>
    field: ControllerRenderProps<any, any>
    helperText?: string
    title?: string
    width?: string
}

export default function FormInputWrapper({
                                             children,
                                             formState,
                                             field,
                                             helperText,
                                             title,
                                             width
                                         }: FormInputWrapperProps): JSX.Element {

    return (
        <>
            <FormControl
                size="md"
                isInvalid={formState.errors[`${field.name}`] !== undefined}
            >
                {title && (
                    <FormControlLabel mb="$1">
                        <FormControlLabelText>{title}</FormControlLabelText>
                    </FormControlLabel>
                )}
                {children}
                {helperText && (
                    <FormControlHelper>
                        <FormControlHelperText>
                            {helperText}
                        </FormControlHelperText>
                    </FormControlHelper>
                )}
            </FormControl>
        </>

    )
}

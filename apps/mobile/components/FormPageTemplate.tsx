import {
    Box,
    Button,
    ButtonSpinner,
    ButtonText,
    KeyboardAvoidingView,
    ScrollView,
    View,
    VStack
} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet, Platform, Keyboard, TouchableWithoutFeedback} from "react-native";

interface FormPageTemplateProps {
    children: React.ReactNode
    buttonLabel?: string
    form: any
    onSubmit: (data: any) => void
}

export default function FormPageTemplate({form, children, buttonLabel, onSubmit}: FormPageTemplateProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View bg={'white'} w={'100%'} h={'100%'}>
                    <ScrollView>
                        <VStack space="md" my={'$4'} mx={'$4'} h={'100%'}>
                            {children}
                        </VStack>
                    </ScrollView>
                    <Box bg={'transparent'}>
                        <Button mx={'$8'} mb={"$8"} onPress={form.handleSubmit(onSubmit)}>
                            {form.formState.isSubmitting ? <ButtonSpinner/> : <ButtonText>Next</ButtonText>}
                        </Button>
                    </Box>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
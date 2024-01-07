import React from 'react';
import {StyleSheet} from 'react-native';
import {
    Button,
    ButtonSpinner,
    ButtonText,
    Heading,
    Input,
    InputField,
    Pressable,
    Text,
    useToast,
    View
} from "@gluestack-ui/themed";
import * as z from "zod";
import {InferType} from "prop-types";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@apollo/client";
import {GetOtpMutation, graphql} from "gql-types";
import FormInputWrapper from "../FormInputWrapper";
import {showErrorToast} from "../../lib/toasts";
import {useRouter} from "expo-router";


const enterEmailSchema = z.object({
    email: z.string().email(),
});
export type EnterEmail = InferType<typeof enterEmailSchema>;

interface EnterEmailForResetProps {
    onSubmit?: (values: GetOtpMutation) => void
}

export const getOTP = graphql(`
    mutation GetOTP($email: String!) {
        requestVerificationCode(email: $email) {
            msg
            phone
            email
        }
    }
`);

export default function EnterEmailForReset({onSubmit}: EnterEmailForResetProps) {
    const toast = useToast()
    const router = useRouter();
    const [getOTPMutation, {loading}] = useMutation(getOTP, {
        onError: (error) => {
            showErrorToast({error, toast})
        },
        onCompleted: (data) => {
            onSubmit && onSubmit(data)
        }
    })
    const form = useForm<EnterEmail>({
        resolver: zodResolver(enterEmailSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async (values: EnterEmail) => {
        await getOTPMutation({variables: {email: values.email.toLowerCase()}})
    };

    return (
        <View style={styles.container}>
            <Heading>Reset Password</Heading>
            <Controller
                control={form.control}
                name="email"
                render={({field, formState, fieldState}) => (
                    <FormInputWrapper title={'Email'} formState={formState} field={field}>
                        <Input w={'100%'}>
                            <InputField
                                type={'text'}
                                onBlur={field.onBlur}
                                value={field.value}
                                onChange={value => field.onChange(value.nativeEvent.text)}
                            />
                        </Input>
                    </FormInputWrapper>
                )}
            />
            <Button onPress={form.handleSubmit(handleSubmit)}>
                {loading ? <ButtonSpinner/> : <ButtonText>Get Verification Code</ButtonText>}
            </Button>
            <Pressable onPress={() => router.push('/(unauthenticated)/sign-in')}>
                <Text size={'sm'}>Back to login</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        gap: 40,
        width: '75%'
    }
})
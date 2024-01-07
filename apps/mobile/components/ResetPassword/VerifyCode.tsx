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
import {graphql, VerifyOtpMutation} from "gql-types";
import FormInputWrapper from "../FormInputWrapper";
import {showErrorToast} from "../../lib/toasts";
import {useRouter} from "expo-router";


interface VerifyCodeProps {
    email: string
    phoneNum: string
    onSuccess?: (result: VerifyOtpMutation) => void
}


export const verifyOTP = graphql(`
    mutation VerifyOTP($input: VerifyCodeInput!) {
        verifyOTP(input: $input) {
            reset_password_token
        }
    }
`);

export default function VerifyCode({email, onSuccess, phoneNum}: VerifyCodeProps) {
    const toast = useToast()
    const router = useRouter()
    const [verifyOTPMutation, {loading}] = useMutation(verifyOTP, {
        onError: (error) => {
            showErrorToast({error, toast})
        },
        onCompleted: (data) => {
            onSuccess && onSuccess(data)
        }
    })

    const verifyCodeSchema = z.object({
        code: z.string().min(4)
    });
    type Code = InferType<typeof verifyCodeSchema>;
    const form = useForm<Code>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (values: Code) => {
        await verifyOTPMutation({
            variables: {
                input: {
                    email: email,
                    code: values.code
                }
            }
        })
    };

    return (
        <View style={styles.container}>
            <Heading>Reset Password</Heading>
            <Controller
                control={form.control}
                name="code"
                render={({field, formState, fieldState}) => (
                    <FormInputWrapper title={'Code'} formState={formState} field={field}>
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
            <Button onPress={form.handleSubmit(onSubmit)}>
                {loading ? <ButtonSpinner/> : <ButtonText>Verify Code</ButtonText>}
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
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
import {Controller, useForm} from "react-hook-form";
import FormInputWrapper from "../FormInputWrapper";
import {StyleSheet} from "react-native";
import React from "react";
import * as z from "zod";
import {InferType} from "prop-types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@apollo/client";
import {graphql} from "gql-types";
import {useRouter} from "expo-router";
import {useSetRecoilState} from "recoil";
import {accessTokenState} from "../../state/atoms";
import {showErrorToast} from "../../lib/toasts";

export const resetPassword = graphql(`
    mutation ResetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input) {
            access_token
        }
    }
`);

interface NewPasswordProps {
    token: string
}

export default function NewPassword({token}: NewPasswordProps) {
    const router = useRouter();
    const toast = useToast();
    const setAccessToken = useSetRecoilState(accessTokenState);
    const [resetPasswordMutation, {loading}] = useMutation(resetPassword, {
        onError: (error) => {
            showErrorToast({error, toast})
        },
        onCompleted: (data) => {
            setAccessToken(data.resetPassword.access_token)
            router.push('/(app)/home')
        }
    })

    const newPasswordSchema = z.object({
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"),
    });
    type NewPasswordType = InferType<typeof newPasswordSchema>;

    const form = useForm<NewPasswordType>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (values: NewPasswordType) => {
        await resetPasswordMutation({
            variables: {
                input: {
                    password: values.password,
                    token: token
                }
            }
        })
    };

    return (
        <View style={styles.container}>
            <Heading>Reset Password</Heading>
            <Controller
                control={form.control}
                name="password"
                render={({field, formState, fieldState}) => (
                    <FormInputWrapper title={'Password'} formState={formState} field={field}>
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
                {loading ? <ButtonSpinner/> : <ButtonText>Update password</ButtonText>}
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

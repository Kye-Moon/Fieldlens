import React, {useEffect} from 'react';
import {
    Box,
    Button,
    ButtonSpinner,
    ButtonText,
    Center,
    HStack,
    Image,
    Input,
    InputField,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    View
} from "@gluestack-ui/themed";
import {Platform, StyleSheet} from "react-native";
import {useMutation} from "@apollo/client";
import {graphql} from "gql-types";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "./signinSchema";
import FormInputWrapper from "../../components/FormInputWrapper";
import {accessTokenState} from "../../state/atoms";
import {useRecoilState} from "recoil";

export const signMutationMobile = graphql(`
    mutation SignUpMutation($input: SignUpInput!) {
        signup(signupInput: $input) {
            access_token
            refresh_token
            user {
                id
            }
        }
    }
`);

export default function SignIn() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    useEffect(() => {
        if (accessToken) {
            router.push('/(app)/home')
        }
    }, [accessToken]);


    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            organisationName: '',
            email: '',
            password: '',
        }
    })

    const [signUp] = useMutation(signMutationMobile, {
        onError: (error) => {
            console.log(error);
            throw error;
        },
        onCompleted: async (data) => {
            setAccessToken(data.signup.access_token);
        }
    })

    const onSubmit = async (data: any) => {
        await signUp({
            variables: {
                input: {
                    firstName: '',
                    lastName: '',
                    organisationName: '',
                    email: data.email.toLowerCase(),
                    password: data.password,
                },
            }
        })
        router.push('/(app)/home')
    }

    return (
        <Box style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={{flex: 1}}
            >
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <Center style={styles.content}>
                        <Image alt={'logo'} source={require('../../assets/images/FieldLens.png')} style={styles.logo}/>
                        <HStack style={styles.names}>
                            <Controller
                                control={form.control}
                                name="firstName"
                                render={({field, formState, fieldState}) => (
                                    <View style={{width: '50%'}}>
                                        <FormInputWrapper title={'First Name'} formState={formState} field={field}>
                                            <Input>
                                                <InputField
                                                    type={'text'}
                                                    onBlur={field.onBlur}
                                                    value={field.value}
                                                    onChange={value => field.onChange(value.nativeEvent.text)}
                                                />
                                            </Input>
                                        </FormInputWrapper>
                                    </View>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name="lastName"
                                render={({field, formState, fieldState}) => (
                                    <View style={{width: '50%'}}>
                                        <FormInputWrapper title={'Last Name'} formState={formState} field={field}>
                                            <Input>
                                                <InputField
                                                    type={'text'}
                                                    onBlur={field.onBlur}
                                                    value={field.value}
                                                    onChange={value => field.onChange(value.nativeEvent.text)}
                                                />
                                            </Input>
                                        </FormInputWrapper>
                                    </View>
                                )}
                            />
                        </HStack>
                        <Controller
                            control={form.control}
                            name="organisationName"
                            render={({field, formState, fieldState}) => (
                                <FormInputWrapper title={'Organisation Name'} formState={formState} field={field}>
                                    <Input w={'100%'}>
                                        <InputField
                                            placeholder={'(optional)'}
                                            type={'text'}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            onChange={value => field.onChange(value.nativeEvent.text)}
                                        />
                                    </Input>
                                </FormInputWrapper>
                            )}
                        />
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
                        <Controller
                            control={form.control}
                            name="password"
                            render={({field, formState, fieldState}) => (
                                <FormInputWrapper title={'Password'} formState={formState} field={field}>
                                    <Input w={'100%'}>
                                        <InputField
                                            type={'password'}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            onChange={value => field.onChange(value.nativeEvent.text)}
                                        />
                                    </Input>
                                </FormInputWrapper>
                            )}
                        />
                        <Button w={'100%'} mx={'$8'} onPress={form.handleSubmit(onSubmit)}>
                            {form.formState.isSubmitting ? <ButtonSpinner/> : <ButtonText>Create account</ButtonText>}
                        </Button>
                        <Pressable onPress={() => router.push('/sign-in')}>
                            <Text size={'sm'}>Back to login</Text>
                        </Pressable>
                    </Center>
                </ScrollView>
            </KeyboardAvoidingView>
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        gap: 20
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    names: {
        gap: 10,
    },
});

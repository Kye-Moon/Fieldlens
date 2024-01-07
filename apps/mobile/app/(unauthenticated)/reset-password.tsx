import {Box, Center, KeyboardAvoidingView} from "@gluestack-ui/themed";
import React from "react";
import {Platform, StyleSheet} from "react-native";
import EnterEmailForReset from "../../components/ResetPassword/EnterEmailForReset";
import {GetOtpMutation, VerifyOtpMutation} from "gql-types";
import VerifyCode from "../../components/ResetPassword/VerifyCode";
import NewPassword from "../../components/ResetPassword/NewPassword";

export enum ResetPasswordStates {
    PHONE_NUMBER,
    OTP,
    NEW_PASSWORD,
}

export default function ResetPasswordScreen() {
    const [state, setState] = React.useState(ResetPasswordStates.PHONE_NUMBER)
    const [phoneNum, setPhoneNum] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [token, setToken] = React.useState('')

    const handleCodeRequestSuccess = async (result: GetOtpMutation) => {
        setPhoneNum(result.requestVerificationCode.phone ?? '')
        setEmail(result?.requestVerificationCode.email ?? '')
        setState(ResetPasswordStates.OTP)
    }

    const handleVerifySuccess = async (result: VerifyOtpMutation) => {
        setToken(result.verifyOTP.reset_password_token ?? '')
        setState(ResetPasswordStates.NEW_PASSWORD)
    }

    return (
        <Box style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={{flex: 1}}
            >
                <Center style={styles.content}>
                    {state === ResetPasswordStates.PHONE_NUMBER &&
                        <EnterEmailForReset onSubmit={handleCodeRequestSuccess}/>}
                    {state === ResetPasswordStates.OTP &&
                        <VerifyCode onSuccess={handleVerifySuccess} email={email} phoneNum={phoneNum}/>}
                    {state === ResetPasswordStates.NEW_PASSWORD && (
                        <NewPassword token={token}/>
                    )}
                </Center>
            </KeyboardAvoidingView>
        </Box>
    )
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
        gap: 40
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    }
});

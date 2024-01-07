import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginResponse} from './dto/login-response';

import {LoginInput} from './dto/login.input';
import {LoginGuard} from './login-guard';
import {SignUpInput} from "./dto/signUp.input";
import {VerificationTokenResponse, VerifiedCodeResponse} from "./dto/verificationTokenResponse";
import {VerifyCodeInput} from "./dto/verifyCode.input";
import {ResetPasswordInput} from "./dto/reset-password.input";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    @Mutation(() => LoginResponse)
    @UseGuards(LoginGuard)
    login(
        @Args('loginUserInput') loginUserInput: LoginInput,
        @Context() context: any,
    ) {
        const token = this.authService.login(context.user);
        context.res.cookie('access_token', token.access_token, {
            httpOnly: false,
        });
        return token;
    }

    @Mutation(() => LoginResponse)
    signup(@Args('signupInput') signupInput: SignUpInput) {
        return this.authService.signup(signupInput);
    }


    @Mutation(() => VerificationTokenResponse)
    requestVerificationCode(@Args('email') email: string) {
        return this.authService.requestVerification(email);
    }

    @Mutation(() => VerifiedCodeResponse)
    verifyOTP(@Args('input') input: VerifyCodeInput) {
        return this.authService.verifyOTP(input.code, input.email);
    }

    @Mutation(() => LoginResponse)
    resetPassword(@Args('input') input: ResetPasswordInput) {
        return this.authService.resetPassword(input.token, input.password);
    }
}
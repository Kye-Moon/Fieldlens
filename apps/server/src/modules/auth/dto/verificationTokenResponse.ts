import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class VerificationTokenResponse {
    @Field(() => String)
    msg: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    email: string;
}

@ObjectType()
export class VerifiedCodeResponse {
    @Field(() => String)
    reset_password_token: string;
}
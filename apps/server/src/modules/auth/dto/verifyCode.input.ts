import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class VerifyCodeInput {
    @Field(() => String)
    email: string;
    @Field(() => String)
    code: string;
}

import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class SignUpInput {
    @Field(() => String)
    firstName: string;
    @Field(() => String)
    lastName: string;
    @Field(() => String)
    organisationName: string;
    @Field(() => String)
    email: string;
    @Field(() => String)
    password: string;
}
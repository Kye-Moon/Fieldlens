import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    access_token: string;

    @Field(() => String)
    refresh_token: string;

    @Field(() => UserAuth)
    user: Object;
}

@ObjectType()
export class UserAuth {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role: string;

    @Field(() => String)
    orgId: string;
}

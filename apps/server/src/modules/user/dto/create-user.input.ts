import {Field, InputType} from '@nestjs/graphql';
import {UserStatus} from "../entities/user.entity";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phone: string;

    status?: UserStatus

    @Field(() => String, {nullable: true})
    password: string;
}

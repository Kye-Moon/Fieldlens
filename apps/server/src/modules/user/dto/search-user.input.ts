import { Field, InputType } from '@nestjs/graphql';
import {UserRoles} from "../entities/user.entity";


@InputType()
export class SearchUserInput {
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => [String], { nullable: true })
    role?: UserRoles[];

    @Field(() => String, { nullable: true })
    organisationId?: string;
}

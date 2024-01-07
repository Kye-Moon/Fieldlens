import {Field, ObjectType} from '@nestjs/graphql';
import {Organisation} from "../../organisation/entities/organisation.entity";


export type UserRoles = "OWNER" | "ADMIN" | "SUPERVISOR" | "CREW_MEMBER";
export type UserStatus = "ACTIVE" | "INVITED" | "DEACTIVATED"

@ObjectType()
export class User {
    @Field(() => String)
    id: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    organisationId: string;

    @Field(() => Organisation)
    organisation?: Organisation;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

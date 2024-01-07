import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateOrganisationInput {
  @Field(() => String)
  name: string;
}

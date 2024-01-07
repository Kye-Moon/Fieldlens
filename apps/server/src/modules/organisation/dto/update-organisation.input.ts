import { CreateOrganisationInput } from './create-organisation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganisationInput extends PartialType(CreateOrganisationInput) {
  @Field(() => Int)
  id: number;
}

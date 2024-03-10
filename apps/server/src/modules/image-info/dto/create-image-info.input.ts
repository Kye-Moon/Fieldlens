import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInfoInput {
  @Field(() => String)
  imageId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  uri: string;

  @Field(() => [String])
  savedLocations: string[];
}

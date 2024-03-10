import { CreateImageInfoInput } from './create-image-info.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInfoInput extends PartialType(CreateImageInfoInput) {
  @Field(() => String)
  id: string;
}

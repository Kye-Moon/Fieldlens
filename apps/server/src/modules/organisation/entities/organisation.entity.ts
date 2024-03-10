import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Organisation {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string;
}

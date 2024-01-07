import { ObjectType, Field } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
export class Organisation {
  @Field(() => String)
  id: string = v4();

  @Field(() => String)
  name: string;
}

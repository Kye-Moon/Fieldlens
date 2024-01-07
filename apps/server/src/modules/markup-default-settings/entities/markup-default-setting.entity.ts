import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class MarkupDefaultSetting {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  date: boolean;

  @Field(() => Boolean)
  time: boolean;

  @Field(() => Boolean)
  location: boolean;

  @Field(() => Boolean)
  logo: boolean;

  @Field(() => String)
  textColor: string;

  @Field(() => String)
  textBackgroundColor: string;

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}

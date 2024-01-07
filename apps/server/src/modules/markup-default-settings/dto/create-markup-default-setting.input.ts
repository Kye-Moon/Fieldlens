import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateMarkupDefaultSettingInput {
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
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  refreshToken: string;
}

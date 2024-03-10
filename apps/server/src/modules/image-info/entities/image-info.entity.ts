import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ImageInfo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  imageId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  uri: string;

  @Field(() => [String])
  savedLocations: string[];
}

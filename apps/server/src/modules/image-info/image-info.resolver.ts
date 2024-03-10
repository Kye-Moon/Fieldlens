import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImageInfoService } from './image-info.service';
import { ImageInfo } from './entities/image-info.entity';
import { CreateImageInfoInput } from './dto/create-image-info.input';

@Resolver(() => ImageInfo)
export class ImageInfoResolver {
  constructor(private readonly imageInfoService: ImageInfoService) {}

  @Mutation(() => ImageInfo)
  createImageInfo(
    @Args('createImageInfoInput') createImageInfoInput: CreateImageInfoInput,
  ) {
    return this.imageInfoService.create(createImageInfoInput);
  }

  @Query(() => [ImageInfo], { name: 'imageInfo' })
  findAll() {
    return this.imageInfoService.findAll();
  }

  @Mutation(() => ImageInfo)
  removeImageInfo(@Args('id', { type: () => String }) id: string) {
    return this.imageInfoService.remove(id);
  }
}

import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {ImageInfoService} from './image-info.service';
import {ImageInfo} from './entities/image-info.entity';
import {CreateImageInfoInput} from './dto/create-image-info.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver(() => ImageInfo)
export class ImageInfoResolver {
    constructor(private readonly imageInfoService: ImageInfoService) {
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ImageInfo)
    createImageInfo(
        @Args('createImageInfoInput') createImageInfoInput: CreateImageInfoInput,
    ) {
        return this.imageInfoService.create(createImageInfoInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [ImageInfo], {name: 'imageInfo'})
    findAll() {
        return this.imageInfoService.findAll();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ImageInfo)
    removeImageInfo(@Args('id', {type: () => String}) id: string) {
        return this.imageInfoService.remove(id);
    }
}

import {Args, Query, Resolver} from '@nestjs/graphql';
import {S3Service} from './s3.service';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../guards/auth.guard";

@Resolver()
export class S3Resolver {
    constructor(private readonly s3Service: S3Service) {
    }
    @UseGuards(AuthGuard)
    @Query(() => String)
    presignedUrl(@Args('key') key: string) {
        return this.s3Service.getPresignedUrl(key);
    }
}

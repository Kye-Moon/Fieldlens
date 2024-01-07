import {Args, Query, Resolver} from '@nestjs/graphql';
import {S3Service} from './s3.service';

@Resolver()
export class S3Resolver {
    constructor(private readonly s3Service: S3Service) {
    }

    @Query(() => String)
    presignedUrl(@Args('key') key: string) {
        return this.s3Service.getPresignedUrl(key);
    }
}

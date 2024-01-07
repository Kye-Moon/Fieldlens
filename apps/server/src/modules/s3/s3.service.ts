import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

@Injectable()
export class S3Service {
    constructor(
        private configService: ConfigService
    ) {
    }

    async getPresignedUrl(key: string) {
        const s3Client = new S3Client({region: 'ap-southeast-2'});
        const bucket = this.configService.get('S3_BUCKET');
        let command = new PutObjectCommand({Bucket: bucket, Key: key, ContentType: 'image/jpeg', ACL: 'public-read'});
        return await getSignedUrl(s3Client, command, {expiresIn: 3600});
    }
}


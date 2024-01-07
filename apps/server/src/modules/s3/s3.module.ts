import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Resolver } from './s3.resolver';
import {ConfigModule} from "@nestjs/config";

@Module({
  providers: [S3Resolver, S3Service],
  imports: [ConfigModule],
})
export class S3Module {}

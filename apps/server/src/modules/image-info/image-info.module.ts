import { Module } from '@nestjs/common';
import { ImageInfoService } from './image-info.service';
import { ImageInfoResolver } from './image-info.resolver';
import { ImageInfoRepository } from './image-info.repository';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  providers: [ImageInfoResolver, ImageInfoService, ImageInfoRepository],
  imports: [DrizzleModule],
  exports: [ImageInfoService, ImageInfoRepository],
})
export class ImageInfoModule {}

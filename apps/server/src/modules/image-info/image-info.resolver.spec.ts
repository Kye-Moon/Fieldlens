import { Test, TestingModule } from '@nestjs/testing';
import { ImageInfoResolver } from './image-info.resolver';
import { ImageInfoService } from './image-info.service';

describe('ImageInfoResolver', () => {
  let resolver: ImageInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageInfoResolver, ImageInfoService],
    }).compile();

    resolver = module.get<ImageInfoResolver>(ImageInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

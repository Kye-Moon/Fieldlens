import { Injectable } from '@nestjs/common';
import { CreateImageInfoInput } from './dto/create-image-info.input';
import { ImageInfoRepository } from './image-info.repository';

@Injectable()
export class ImageInfoService {
  constructor(private readonly imageInfoRepository: ImageInfoRepository) {}

  async create(createImageInfoInput: CreateImageInfoInput) {
    return await this.imageInfoRepository.create(createImageInfoInput);
  }

  async findAll() {
    return this.imageInfoRepository.findTop();
  }

  async remove(id: string) {
    return await this.imageInfoRepository.delete(id);
  }
}

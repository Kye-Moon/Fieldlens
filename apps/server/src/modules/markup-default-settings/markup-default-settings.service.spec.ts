import { Test, TestingModule } from '@nestjs/testing';
import { MarkupDefaultSettingsService } from './markup-default-settings.service';

describe('MarkupDefaultSettingsService', () => {
  let service: MarkupDefaultSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkupDefaultSettingsService],
    }).compile();

    service = module.get<MarkupDefaultSettingsService>(MarkupDefaultSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

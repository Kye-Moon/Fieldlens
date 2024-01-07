import { Test, TestingModule } from '@nestjs/testing';
import { MarkupDefaultSettingsResolver } from './markup-default-settings.resolver';
import { MarkupDefaultSettingsService } from './markup-default-settings.service';

describe('MarkupDefaultSettingsResolver', () => {
  let resolver: MarkupDefaultSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkupDefaultSettingsResolver, MarkupDefaultSettingsService],
    }).compile();

    resolver = module.get<MarkupDefaultSettingsResolver>(MarkupDefaultSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

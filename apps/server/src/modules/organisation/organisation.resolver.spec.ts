import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationResolver } from './organisation.resolver';
import { OrganisationService } from './organisation.service';

describe('OrganisationResolver', () => {
  let resolver: OrganisationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationResolver, OrganisationService],
    }).compile();

    resolver = module.get<OrganisationResolver>(OrganisationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TopTypeService } from './top-type.service';

describe('TopTypeService', () => {
  let service: TopTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopTypeService],
    }).compile();

    service = module.get<TopTypeService>(TopTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

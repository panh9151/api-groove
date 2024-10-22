import { Test, TestingModule } from '@nestjs/testing';
import { MusicHistoryService } from './music-history.service';

describe('MusicHistoryService', () => {
  let service: MusicHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicHistoryService],
    }).compile();

    service = module.get<MusicHistoryService>(MusicHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

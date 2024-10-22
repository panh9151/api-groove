import { Test, TestingModule } from '@nestjs/testing';
import { MusicHistoryController } from './music-history.controller';
import { MusicHistoryService } from './music-history.service';

describe('MusicHistoryController', () => {
  let controller: MusicHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicHistoryController],
      providers: [MusicHistoryService],
    }).compile();

    controller = module.get<MusicHistoryController>(MusicHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

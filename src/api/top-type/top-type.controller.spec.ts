import { Test, TestingModule } from '@nestjs/testing';
import { TopTypeController } from './top-type.controller';
import { TopTypeService } from './top-type.service';

describe('TopTypeController', () => {
  let controller: TopTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopTypeController],
      providers: [TopTypeService],
    }).compile();

    controller = module.get<TopTypeController>(TopTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

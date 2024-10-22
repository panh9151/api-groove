import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInforController } from './update-infor.controller';
import { UpdateInforService } from './update-infor.service';

describe('UpdateInforController', () => {
  let controller: UpdateInforController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateInforController],
      providers: [UpdateInforService],
    }).compile();

    controller = module.get<UpdateInforController>(UpdateInforController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInforService } from './update-infor.service';

describe('UpdateInforService', () => {
  let service: UpdateInforService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateInforService],
    }).compile();

    service = module.get<UpdateInforService>(UpdateInforService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

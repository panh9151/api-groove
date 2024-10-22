import { Test, TestingModule } from '@nestjs/testing';
import { VerifyEmailController } from './verify-email.controller';
import { VerifyEmailService } from './verify-email.service';

describe('VerifyEmailController', () => {
  let controller: VerifyEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyEmailController],
      providers: [VerifyEmailService],
    }).compile();

    controller = module.get<VerifyEmailController>(VerifyEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

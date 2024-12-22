import { Test, TestingModule } from '@nestjs/testing';
import { CompletePaymentController } from './complete-payment.controller';
import { CompletePaymentService } from './complete-payment.service';

describe('CompletePaymentController', () => {
  let controller: CompletePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletePaymentController],
      providers: [CompletePaymentService],
    }).compile();

    controller = module.get<CompletePaymentController>(CompletePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

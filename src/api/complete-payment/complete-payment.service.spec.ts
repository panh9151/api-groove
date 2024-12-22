import { Test, TestingModule } from '@nestjs/testing';
import { CompletePaymentService } from './complete-payment.service';

describe('CompletePaymentService', () => {
  let service: CompletePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletePaymentService],
    }).compile();

    service = module.get<CompletePaymentService>(CompletePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

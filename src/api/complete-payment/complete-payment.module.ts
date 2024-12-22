import { Module } from '@nestjs/common';
import { CompletePaymentService } from './complete-payment.service';
import { CompletePaymentController } from './complete-payment.controller';

@Module({
  controllers: [CompletePaymentController],
  providers: [CompletePaymentService],
})
export class CompletePaymentModule {}

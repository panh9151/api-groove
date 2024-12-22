import { Body, Controller, Post, Request } from '@nestjs/common';
import { CompletePaymentService } from './complete-payment.service';

@Controller('complete-payment')
export class CompletePaymentController {
  constructor(private readonly completePaymentService: CompletePaymentService) {}

  @Post()
  create(@Body() body: CompletePaymentDto, @Request() req: any) {
    return this.completePaymentService.getCompletePayment(body, req);
  }
}

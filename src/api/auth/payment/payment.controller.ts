import { UserGuard } from "../../../guard/user/user.guard";
import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Controller("auth/payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req: any) {
    return this.paymentService.create(createPaymentDto, req);
  }
}

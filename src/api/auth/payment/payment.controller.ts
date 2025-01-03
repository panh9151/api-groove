import { AdminGuard } from "./../../../guard/admin/admin.guard";
import { UserGuard } from "../../../guard/user/user.guard";
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Controller("auth/payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req: any) {
    return this.paymentService.create(createPaymentDto, req);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Request() req: any
  ) {
    return this.paymentService.update(id, updatePaymentDto, req);
  }
}

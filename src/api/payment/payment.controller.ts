import { UserGuard } from "./../../guard/user/user.guard";
import { AdminGuard } from "./../../guard/admin/admin.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(UserGuard)
  @Post(":id")
  post(@Body() body: CreatePaymentDto, @Request() req: any) {
    return this.paymentService.create(body, req);
  }

  @UseGuards(UserGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @UseGuards(AdminGuard)
  @Get("chart")
  getChart() {
    return this.paymentService.getChart();
  }
}

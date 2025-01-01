import { PartialType } from "@nestjs/swagger";
import { CreatePaymentDto } from "./create-payment.dto";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsEnum(["paid", "pending", "cancel"], {
    message: "Role must be paid, unpaid, or cancel",
  })
  status: string;
}

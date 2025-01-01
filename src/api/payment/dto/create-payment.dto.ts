import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  vip_code: string;

  @IsString()
  method: string;

  @IsNumber()
  amount: number;

  @IsEnum(["paid", "pending", "cancel"], {
    message: "Role must be paid, unpaid, or cancel",
  })
  status: string;
}

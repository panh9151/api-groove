import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  method: string;

  @IsNumber()
  amount: number;

  @IsEnum(["paid", "pending", "cancel"], {
    message: "Role must be paid, unpaid, or cancel",
  })
  status: string;
}

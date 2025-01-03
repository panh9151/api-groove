import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  method: string;

  @IsNumber()
  amount: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CompletePaymentDto {
  @IsString()
  id_music: string;

  @IsString()
  text: string;
}

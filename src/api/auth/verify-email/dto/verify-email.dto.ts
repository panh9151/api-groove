import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class VerifyEmailDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: "Email (Bắt buộc)",
    example: "abc@gmail.com (Bắt buộc)",
    required: true,
  })
  email: string;
}

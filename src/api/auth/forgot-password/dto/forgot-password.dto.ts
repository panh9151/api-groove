import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email (Bắt buộc)",
    example: "abc@gmail.com (Bắt buộc)",
    required: true,
  })
  email: string;
}

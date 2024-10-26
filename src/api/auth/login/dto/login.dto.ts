import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email đăng nhập (Bắt buộc)",
    example: "abc@gmail.com (Bắt buộc)",
    required: true,
  })
  email: string;

  @Length(6, 40)
  @IsString()
  @ApiProperty({
    description: "Mật khẩu (bắt buộc)",
    example: "123456789 (Bắt buộc)",
    required: true,
  })
  password: string;
}

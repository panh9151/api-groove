import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @ApiProperty({
    description: "Tên đầy đủ (Bắt buộc)",
    example: "Nguyễn Văn A (Bắt buộc)",
    required: true,
  })
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email đáng ký (Bắt buộc)",
    example: "abc@gmail.com (Bắt buộc)",
    required: true,
  })
  email: string;

  @Length(6, 40)
  @IsString()
  password: string;
}

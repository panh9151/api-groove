import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export enum UserRole {
  user = "user",
  admin = "admin",
}

export enum UserGender {
  male = "male",
  female = "female",
}

export enum BannedStatus {
  BANNED = 1,
  ACTIVE = 0,
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: "email",
    example: "abc@gmail.com",
    required: true,
  })
  email: string;

  @IsString()
  @Length(6, 40)
  @IsOptional()
  @ApiProperty({
    description: "Mật khẩu (6-40 ký tự)",
    example: "123456789",
    required: true,
  })
  password: string;

  @IsEnum(UserRole, { message: "role must be user or admin" })
  @IsOptional()
  @ApiProperty({
    description: "Quyền người dùng",
    example: "user",
    required: false,
    default: "user",
  })
  role: "user" | "admin" = "user";

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Tên đầy đủ (Bắt buộc)",
    example: "Nguyễn Văn A",
    required: true,
  })
  fullname: string;

  @IsString()
  @Length(10, 12)
  @IsOptional()
  @ApiProperty({
    description: "Số điện thoại",
    example: "0123456789",
    required: false,
  })
  phone: string;

  @IsEnum(UserGender, { message: "gender must be male or female" })
  @IsOptional()
  @ApiProperty({
    description: "Giới tính",
    example: "male",
    required: false,
  })
  gender: "male" | "female";

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Ảnh đại diện",
    example: "http://example.com",
    required: false,
  })
  url_avatar: string;

  @IsOptional()
  @ApiProperty({
    description: "Ngày sinh",
    example: "2003-12-25",
    required: false,
  })
  birthday: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Quốc gia",
    example: "VN",
    required: false,
  })
  country: string;

  @IsEnum(BannedStatus, { message: "is_banned must be 0 or 1" })
  @IsOptional()
  @ApiProperty({
    description: "Trạng thái banned",
    example: 0,
    required: false,
  })
  is_banned: 0 | 1 = 0;

  is_vip: 1 | 0;
}

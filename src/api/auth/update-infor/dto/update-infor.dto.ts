import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

enum Status {
  BANNED = 1,
  ACTIVE = 0,
}

export class UpdateInforDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Tên đầy đủ",
    example: "Nguyễn Văn A",
    required: false,
  })
  fullname: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Url avatar",
    example: "http://example@gmail.com",
    required: false,
  })
  url_avatar: string;

  @IsString()
  @Length(10, 12)
  @IsOptional()
  @ApiProperty({
    description: "Số điện thoại",
    example: "0123456789",
    required: false,
  })
  phone: string;

  @IsEnum(Gender, {
    message: "Gender must be one of the following: male, female",
  })
  @IsOptional()
  @ApiProperty({
    description: "Giới tính",
    example: "male",
    required: false,
  })
  gender: Gender;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Tuổi",
    example: 19,
    required: false,
  })
  age: number;

  @IsOptional()
  @ApiProperty({
    description: "Ngày sinh",
    example: "2023-12-25",
    required: false,
  })
  birthday: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Quốc tịch",
    example: "VN",
    required: false,
  })
  country: string;
}

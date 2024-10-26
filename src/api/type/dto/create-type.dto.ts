import {
  IsUUID,
  IsString,
  IsDate,
  IsIn,
  IsOptional,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // Thêm import cho ApiProperty

export class CreateTypeDto {
  // Name is required
  @ApiProperty({
    description: "Tên loại (bắt buộc)",
    example: "Dân ca (Bắt buộc)",
  })
  @IsString()
  name: string;

  // Slug is optional
  @ApiProperty({
    description: "Slug loại",
    example: "dan-ca",
    required: false,
  })
  @IsString()
  @IsOptional()
  slug: string;

  // is_show defaults to 1 if not provided
  @ApiProperty({
    description: "Trạng thái hiển thị (0 hoặc 1)",
    example: 1,
    default: 1,
    required: false,
  })
  @IsIn([0, 1])
  @IsOptional()
  is_show: 0 | 1 = 1;
}

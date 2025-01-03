import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from "class-validator";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

class LyricDto {
  @IsNumber()
  start_time: number;

  @IsNumber()
  end_time: number;

  @IsString()
  lyrics: string;
}

export class UpdateMusicDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Tên music (Bắt buộc)",
    example: "Cứ vui lên (Bắt buộc)",
    required: true,
  })
  name: string;

  @IsString()
  @IsOptional()
  @Length(2)
  @ApiProperty({
    description: "Slug",
    example: "cu-vui-len",
    required: false,
  })
  slug: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Url bài hát",
    example: "http://example.com",
    required: false,
  })
  url_path: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Url ảnh bài hát",
    example: "http://example.com",
    required: false,
  })
  url_cover: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Nhà sản xuất âm nhạc",
    example: "http://example.com",
    required: false,
  })
  producer: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Nhạc sĩ (Người sáng tác)",
    example: "c0001",
    required: false,
  })
  composer: string;

  @IsOptional()
  @ApiProperty({
    description: "Ngày phát hành",
    example: "2023-25-12",
    required: false,
  })
  release_date: string;

  @IsEnum(ShowStatus, { message: "is_show must be 0 or 1" })
  @IsOptional()
  @ApiProperty({
    description: "Trạng thái hiển thị",
    example: 1,
    required: false,
  })
  is_show: 0 | 1 = 1;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: "Ca sĩ",
    example: ["a0001", "a0010", "a0005"],
    required: false,
  })
  artists = [];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: "Thể loại",
    example: ["t0001", "t0005"],
    required: false,
  })
  types = [];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LyricDto)
  @IsOptional()
  lyrics: LyricDto[];
}

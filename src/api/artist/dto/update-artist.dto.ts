import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Tên artist",
    example: "Taylor Swift",
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Slug artist",
    example: "taylor-swift",
    required: false,
  })
  slug: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: "Url ảnh đại diện",
    example: "http://example.com",
    required: false,
  })
  url_cover: string;

  @IsOptional()
  @IsEnum(ShowStatus)
  @ApiProperty({
    description: "Trạng thái hiển thị",
    example: 1,
    required: false,
  })
  is_show: ShowStatus;
}

import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { MusicALbum } from "./music-album.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class CreateAlbumDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "ID artist",
    example: "a0001",
    required: false,
  })
  id_artist: string;

  @IsString()
  @ApiProperty({
    description: "Tên album (Bắt buộc)",
    example: "Sóng 1 (Bắt buộc)",
    required: true,
  })
  name;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Slug album",
    example: "song-1",
    required: false,
  })
  slug;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Url ảnh đại diện",
    example: "http://example.com",
    required: false,
  })
  url_cover;

  @IsOptional()
  @ApiProperty({
    description: "Ngày phát hành",
    example: "2023-10-25",
    required: false,
  })
  release_date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Nhà sản xuất",
    example: "My Entertainment",
    required: false,
  })
  publish_by;

  @IsEnum(ShowStatus, { message: "is_show must be 0 or 1" })
  @ApiProperty({
    description: "Trạng thái hiển thị",
    example: 1,
    required: false,
  })
  is_show: 0 | 1 = 1;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MusicALbum)
  @ApiProperty({
    description: "Danh sách bài hát",
    example: [
      { id_music: "m0001", index_order: 2 },
      { id_music: "m0002", index_order: 1 },
    ],
    required: false,
  })
  musics: MusicALbum[];
}

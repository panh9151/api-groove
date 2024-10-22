import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from "class-validator";
import { LyricsDto } from "./lyrics.dto";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  @Length(2)
  slug: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url_path: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url_cover: string;

  @IsInt()
  @IsOptional()
  total_duration: number;

  @IsString()
  @IsOptional()
  producer: string;

  @IsString()
  @IsOptional()
  composer: string;

  @IsDate()
  @IsOptional()
  release_date: Date;

  @IsEnum(ShowStatus, { message: "is_show must be 0 or 1" })
  @IsOptional()
  is_show: 0 | 1 = 1;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  artists = [];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  types = [];

  @IsOptional()
  @IsArray() // Kiểm tra rằng đây là một mảng
  @ValidateNested({ each: true }) // Kiểm tra từng phần tử trong mảng
  @Type(() => LyricsDto)
  lyrics: LyricsDto[];
}

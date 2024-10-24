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

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class CreateAlbumDto {
  @IsString()
  @IsOptional()
  id_artist: string;

  @IsString()
  name;

  @IsString()
  @IsOptional()
  slug;

  @IsUrl()
  @IsOptional()
  url_cover;

  @IsDate()
  @IsOptional()
  release_date;

  @IsString()
  @IsOptional()
  publish_by;

  @IsEnum(ShowStatus, { message: "is_show must be 0 or 1" })
  is_show: 0 | 1 = 1;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MusicALbum)
  musics: MusicALbum[];
}

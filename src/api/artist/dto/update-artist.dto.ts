import { IsEnum, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  url_cover: string;

  @IsOptional()
  @IsEnum(ShowStatus)
  is_show: ShowStatus;
}

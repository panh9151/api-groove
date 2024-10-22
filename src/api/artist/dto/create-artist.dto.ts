import { IsEnum, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class CreateArtistDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id_artist: string = uuidv4();

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  url_cover: Date;

  @IsOptional()
  @IsEnum(ShowStatus)
  is_show: ShowStatus;
}

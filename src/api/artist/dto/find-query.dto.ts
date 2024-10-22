import { IsEnum, IsOptional, IsString } from "class-validator";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class FindQueryDto {
  @IsString()
  @IsOptional()
  id_artist: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(ShowStatus)
  is_show: ShowStatus;
}

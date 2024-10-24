import { IsString, IsInt, IsOptional, IsUUID } from "class-validator";

export class MusicALbum {
  @IsString()
  id_music: string;

  @IsInt()
  @IsOptional()
  index_order: number;
}

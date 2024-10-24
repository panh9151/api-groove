import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddMusicDto {
  @IsString()
  id_music;

  @IsString()
  id_playlist;

  @IsInt()
  @IsOptional()
  index_order;
}

import { IsInt, IsOptional, IsString } from "class-validator";

export class DeleteMusicDto {
  @IsString()
  id_music;

  @IsString()
  id_playlist;
}

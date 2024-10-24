import { IsInt, IsOptional, IsString } from "class-validator";

export class DeletePlaylistDto {
  @IsString()
  id_playlist: string;

  @IsString()
  id_music: string;
}

import { IsInt, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  playlist_index: number;
}

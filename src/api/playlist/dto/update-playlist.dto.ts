import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsString()
  @IsOptional()
  name;

  @IsInt()
  @IsOptional()
  playlist_index;

  @IsString()
  id_playlist;
}

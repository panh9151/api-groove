import { PartialType } from "@nestjs/mapped-types";
import { CreatePlaylistDto } from "./create-playlist.dto";
import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Tên playlist (Bắt buộc)",
    example: "Playlist 1 (Bắt buộc)",
    required: true,
  })
  name;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Vị trí playlist",
    example: 5,
    required: false,
  })
  playlist_index;

  @IsString()
  @ApiProperty({
    description: "ID playlist (Bắt buộc)",
    example: "p0001 (Bắt buộc)",
    required: true,
  })
  id_playlist;
}

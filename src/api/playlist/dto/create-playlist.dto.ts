import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
  @IsString()
  @ApiProperty({
    description: "Tên playlist",
    example: "Playlist 1 (Bắt buộc))",
    required: true,
  })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Vị trí playlist",
    example: 3,
    required: false,
  })
  playlist_index: number;
}

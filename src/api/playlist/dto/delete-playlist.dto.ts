import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class DeletePlaylistDto {
  @IsString()
  @ApiProperty({
    description: "ID playlist (Bắt buộc)",
    example: "p0001 (Bắt buộc)",
    required: true,
  })
  id_playlist: string;

  @IsString()
  @ApiProperty({
    description: "ID music (Bắt buộc)",
    example: "m0001 (Bắt buộc)",
    required: true,
  })
  id_music: string;
}

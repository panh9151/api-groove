import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class DeleteMusicDto {
  @IsString()
  @ApiProperty({
    description: "ID music (Bắt buộc)",
    example: "m0001 (Bắt buộc)",
    required: true,
  })
  id_music;

  @IsString()
  @ApiProperty({
    description: "ID playlist",
    example: "p0001",
    required: true,
  })
  id_playlist;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddMusicDto {
  @IsString()
  @ApiProperty({
    description: "ID music (Bắt buộc)",
    example: "m0001",
    required: true,
  })
  id_music;

  @IsString()
  @ApiProperty({
    description: "ID playlist (Bắt buộc)",
    example: "p0001",
    required: true,
  })
  id_playlist;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Vị trí music trong playlist",
    example: 2,
    required: false,
  })
  index_order;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFavoriteMusicDto {
  @IsString()
  @ApiProperty({
    description: "ID Music (Bắt buộc)",
    example: "m0001 (Bắt buộc)",
    required: true,
  })
  id_music: string;
}

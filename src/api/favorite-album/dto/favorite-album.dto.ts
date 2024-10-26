import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFavoriteAlbumDto {
  @IsString()
  @ApiProperty({
    description: "ID album (Bắt buộc)",
    example: "al0001 (Bắt buộc)",
    required: true,
  })
  id_album: string;
}

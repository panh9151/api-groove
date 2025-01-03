import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteFollowDto {
  @IsString()
  @ApiProperty({
    description: "ID artist (Bắt buộc)",
    example: "a0001 (Bắt buộc)",
    required: true,
  })
  id_artist;
}

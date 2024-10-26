import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateMusicHistoryDto {
  @IsString()
  @ApiProperty({
    description: "ID music (Bắt buộc)",
    example: "m0001 (Bắt buộc)",
    required: true,
  })
  id_music: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: "Thời gian nghe",
    example: 100,
    required: false,
  })
  play_duration: number;
}

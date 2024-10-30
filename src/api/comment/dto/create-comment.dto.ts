import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @ApiProperty({
    description: "ID music",
    example: "m0001",
    required: true,
  })
  id_music: string;

  @ApiProperty({
    description: "Nội dung comment",
    example: "Bài hát này hay quá!",
    required: true,
  })
  @IsString()
  text: string;
}

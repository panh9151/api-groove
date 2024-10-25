import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateComposerDto {
  @IsString()
  @ApiProperty({
    description: "Tên nhạc sĩ (Bắt buộc)",
    example: "Bùi Công Nam (Bắt buộc)",
    required: true,
  })
  name: string;
}

import { PartialType } from "@nestjs/mapped-types";
import { CreateComposerDto } from "./create-composer.dto";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateComposerDto extends PartialType(CreateComposerDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Tên nhạc sĩ (Bắt buộc)",
    example: "Bùi Công Nam (Bắt buộc)",
    required: true,
  })
  name: string;
}

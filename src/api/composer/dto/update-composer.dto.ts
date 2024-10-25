import { PartialType } from "@nestjs/mapped-types";
import { CreateComposerDto } from "./create-composer.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateComposerDto extends PartialType(CreateComposerDto) {
  @IsString()
  @IsOptional()
  name: string;
}

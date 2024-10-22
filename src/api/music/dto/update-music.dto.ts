import { PartialType } from "@nestjs/mapped-types";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";
import { CreateMusicDto } from "./create-music.dto";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

export class UpdateMusicDto extends PartialType(CreateMusicDto) {
  @IsOptional()
  @IsString()
  name: string;
}

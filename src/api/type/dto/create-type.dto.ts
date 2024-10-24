import {
  IsUUID,
  IsString,
  IsDate,
  IsIn,
  IsOptional,
  IsNotEmpty,
} from "class-validator";
import { v4 as uuidv4 } from "uuid";

export class CreateTypeDto {
  // Name is required
  @IsString()
  name: string;

  // Slug is optional
  @IsString()
  @IsOptional()
  slug: string;

  // Created_at is optional and validated as Date
  @IsDate()
  @IsOptional()
  created_at: string;

  // is_show defaults to 1 if not provided
  @IsIn([0, 1])
  @IsOptional()
  is_show: 0 | 1 = 1;
}

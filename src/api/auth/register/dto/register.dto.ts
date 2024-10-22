import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";
import { v4 as uuidv4 } from "uuid";

export class RegisterDto {
  @IsUUID()
  @IsOptional()
  id_user: string = uuidv4();

  @IsString()
  fullname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 40)
  @IsString()
  password: string;
}

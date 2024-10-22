import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(6, 40)
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  fullname: string;
}

import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 40)
  @IsString()
  password: string;
}

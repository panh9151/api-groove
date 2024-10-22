import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class ResetPassworđto {
  @Length(6, 40)
  @IsString()
  newPassword: string;
}

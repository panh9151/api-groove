import { IsString, Length } from "class-validator";

export class ChangePasswordDto {
  @Length(6, 40)
  @IsString()
  oldPassword: string;

  @Length(6, 40)
  @IsString()
  newPassword: string;
}

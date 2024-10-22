import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export enum UserRole {
  user = "user",
  admin = "admin",
}

export enum UserGender {
  male = "male",
  female = "female",
}

export enum BannedStatus {
  BANNED = 1,
  ACTIVE = 0,
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 40)
  password: string;

  @IsEnum(UserRole, { message: "role must be user or admin" })
  @IsOptional()
  role: "user" | "admin" = "user";

  @IsString()
  fullname: string;

  @IsString()
  @Length(10, 12)
  @IsOptional()
  phone: string;

  @IsEnum(UserGender, { message: "gender must be male or female" })
  @IsOptional()
  gender: "male" | "female";

  @IsString()
  @IsOptional()
  url_avatar: string;

  @IsDate()
  @IsOptional()
  birthday: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsEnum(BannedStatus, { message: "is_banned must be 0 or 1" })
  @IsOptional()
  is_banned: 0 | 1 = 0;
}

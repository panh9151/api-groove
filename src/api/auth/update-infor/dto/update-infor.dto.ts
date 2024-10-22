import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

enum Status {
  BANNED = 1,
  ACTIVE = 0,
}

export class UpdateInforDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url_avatar: string;

  @IsString()
  @Length(10, 12)
  @IsOptional()
  phone: string;

  @IsEnum(Gender, {
    message: "Role must be one of the following: admin, user, guest",
  })
  @IsOptional()
  gender: Gender;

  @IsInt()
  @IsOptional()
  age: number;

  @IsDate()
  @IsOptional()
  birthday: Date;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  @IsEnum(Gender, {
    message:
      "User banned status must be one of the following: 0 (active) and 1 (banned)",
  })
  is_banned: Status;
}

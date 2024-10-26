import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class ResetPassworDto {
  @Length(6, 40)
  @IsString()
  @ApiProperty({
    description: "Mật khẩu mới",
    example: "987654321",
    required: true,
  })
  newPassword: string;
}

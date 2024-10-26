import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class ChangePasswordDto {
  @Length(6, 40)
  @IsString()
  @ApiProperty({
    description: "Mật khẩu cũ (Bắt buộc)",
    example: "12345678i9 (Bắt buộc)",
    required: true,
  })
  oldPassword: string;

  @Length(6, 40)
  @IsString()
  @ApiProperty({
    description: "Mật khẩu mới (Bắt buộc)",
    example: "987654321 (Bắt buộc)",
    required: true,
  })
  newPassword: string;
}

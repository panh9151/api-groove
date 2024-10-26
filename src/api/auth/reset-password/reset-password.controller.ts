import { Controller, Post, Body, Param } from "@nestjs/common";
import { ResetPasswordService } from "./reset-password.service";
import { ResetPassworDto } from "./dto/reset-password.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("reset-password")
@ApiTags("auth")
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post(":token")
  @ApiOperation({ summary: "Reset mật khẩu" })
  @ApiBody({ type: ResetPassworDto })
  resetPasword(@Param("token") token: string, @Body() body: ResetPassworDto) {
    return this.resetPasswordService.resetPasword(body, token);
  }
}

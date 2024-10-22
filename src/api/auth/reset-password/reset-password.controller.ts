import { Controller, Post, Body, Param } from "@nestjs/common";
import { ResetPasswordService } from "./reset-password.service";
import { ResetPassworđto } from "./dto/reset-password.dto";

@Controller("reset-password")
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post(":token")
  resetPasword(@Param("token") token: string, @Body() body: ResetPassworđto) {
    return this.resetPasswordService.resetPasword(body, token);
  }
}

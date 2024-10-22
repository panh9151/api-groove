import { Controller, Post, Body, Request } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Controller("forgot-password")
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  forgotPassword(@Body() body: ForgotPasswordDto, @Request() req: any) {
    return this.forgotPasswordService.forgotPassword(body.email, req);
  }
}

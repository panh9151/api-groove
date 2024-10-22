import { Controller, Post, Body } from "@nestjs/common";
import { VerifyEmailService } from "./verify-email.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";

@Controller("verify-email")
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @Post()
  verifyEmail(@Body() body: VerifyEmailDto) {
    return this.verifyEmailService.verifyEmail(body);
  }
}

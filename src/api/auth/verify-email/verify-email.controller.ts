import { Controller, Post, Body } from "@nestjs/common";
import { VerifyEmailService } from "./verify-email.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("verify-email")
@ApiTags("auth")
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @Post()
  @ApiOperation({ summary: "Xác thực email" })
  @ApiBody({ type: VerifyEmailDto })
  verifyEmail(@Body() body: VerifyEmailDto) {
    return this.verifyEmailService.verifyEmail(body);
  }
}

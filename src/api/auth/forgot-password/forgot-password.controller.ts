import { Controller, Post, Body, Request } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("forgot-password")
@ApiTags("auth")
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  @ApiOperation({ summary: "Quên mật khẩu" })
  @ApiBody({ type: ForgotPasswordDto })
  forgotPassword(@Body() body: ForgotPasswordDto, @Request() req: any) {
    return this.forgotPasswordService.forgotPassword(body.email, req);
  }
}

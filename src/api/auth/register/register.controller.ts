import { Controller, Post, Body } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { RegisterDto } from "./dto/register.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("register")
@ApiTags("auth")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: "Đăng ký người dùng" })
  @ApiBody({ type: RegisterDto })
  registerUser(@Body() body: RegisterDto) {
    return this.registerService.registerUser(body);
  }
}

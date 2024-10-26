import { Controller, Post, Body } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("login")
@ApiTags("auth")
export class LoginController {
  constructor(
    private readonly loginService: LoginService // Tiêm trực tiếp LoginService
  ) {}

  @Post()
  @ApiOperation({ summary: "Đăng nhập" })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto.email, loginDto.password);
  }
}

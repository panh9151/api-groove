import { Controller, Post, Body } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("register")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  registerUser(@Body() body: RegisterDto) {
    return this.registerService.registerUser(body);
  }
}

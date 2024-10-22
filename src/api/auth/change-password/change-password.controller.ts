import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Request,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { ChangePasswordService } from "./change-password.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserGuard } from "src/guard/user/user.guard";
import * as bcrypt from "bcryptjs";

@Controller("change-password")
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @UseGuards(UserGuard)
  @Patch("")
  async changePassword(@Request() req: any, @Body() body: ChangePasswordDto) {
    return this.changePasswordService.changePassword(req, body);
  }
}

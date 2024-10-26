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
import { UserGuard } from "../../../guard/user/user.guard";
import * as bcrypt from "bcryptjs";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("change-password")
@ApiTags("auth")
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @UseGuards(UserGuard)
  @Patch("")
  @ApiOperation({ summary: "Sửa mật khẩu - Yêu cầu đăng nhập" })
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(@Request() req: any, @Body() body: ChangePasswordDto) {
    return this.changePasswordService.changePassword(req, body);
  }
}

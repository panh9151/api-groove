import { Controller, Get, Body, Request, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UserGuard } from "../../../guard/user/user.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("profile")
@ApiTags("auth")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(UserGuard)
  @Get()
  @ApiOperation({ summary: "Lấy thông tin user - Yêu cầu đăng nhập" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      email: "anhpt2611@gmail.com",
      role: "admin",
      fullname: "Phạm Tuấn Anh",
      phone: null,
      gender: "female",
      url_avatar: null,
      birthday: "2003-12-24T17:00:00.000Z",
      country: "VN",
      created_at: "2024-08-17T08:11:11.000Z",
      last_update: "2024-08-17T08:11:11.000Z",
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID user không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  getProfile(@Request() req: any) {
    return this.profileService.getProfile(req);
  }
}

import { UserGuard } from "./../../guard/user/user.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới người dùng - Yêu cầu admin" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID user không tồn tại" })
  @ApiResponse({ status: 409, description: "Phone / Email đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: "Lấy danh sách người dùng - Yêu cầu admin" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_user", required: false, description: "ID người dùng" })
  @ApiQuery({ name: "email", required: false, description: "Email người dùng" })
  @ApiQuery({
    name: "role",
    required: false,
    description: "Vai trò người dùng",
  })
  @ApiQuery({ name: "fullname", required: false, description: "Tên đầy đủ" })
  @ApiQuery({ name: "phone", required: false, description: "Số điện thoại" })
  @ApiQuery({ name: "gender", required: false, description: "Giới tính" })
  @ApiQuery({ name: "birthday", required: false, description: "Ngày sinh" })
  @ApiQuery({ name: "country", required: false, description: "Quốc gia" })
  @ApiQuery({
    name: "is_banned",
    required: false,
    description: "Trạng thái khóa tài khoản (0 hoặc 1)",
  })
  @ApiQuery({
    name: "id_google",
    required: false,
    description: "ID Google của người dùng",
  })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          id_user: "u0001",
          email: "abc@gmail.com",
          role: "admin",
          fullname: "Nguyễn Văn A",
          phone: null,
          gender: "female",
          url_avatar: null,
          birthday: "2003-12-25",
          country: "VN",
          created_at: "2024-08-17T08:11:11.000Z",
          last_update: "2024-08-17T08:11:11.000Z",
          is_banned: 0,
          id_google: null,
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_user") id_user: string,
    @Query("email") email: string,
    @Query("role") role: string,
    @Query("fullname") fullname: string,
    @Query("phone") phone: string,
    @Query("gender") gender: string,
    @Query("birthday") birthday: string,
    @Query("country") country: string,
    @Query("is_banned") is_banned: 0 | 1,
    @Query("id_google") id_google: string
  ) {
    return this.userService.findAll(
      +limit,
      +offset,
      id_user,
      email,
      role,
      fullname,
      phone,
      gender,
      birthday,
      country,
      is_banned,
      id_google
    );
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get(":id")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Lấy 1 user - Yêu cầu admin" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
        id_user: "u0001",
        email: "abc@gmail.com",
        role: "admin",
        fullname: "Nguyễn Văn A",
        phone: null,
        gender: "female",
        url_avatar: null,
        birthday: "2003-12-25",
        country: "VN",
        created_at: "2024-08-17T08:11:11.000Z",
        last_update: "2024-08-17T08:11:11.000Z",
        is_banned: 0,
        id_google: null,
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID user không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Patch(":id")
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Sửa user - Yêu cầu admin" })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: "Thành công",
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID user không tồn tại" })
  @ApiResponse({ status: 409, description: "Phone / Email đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  // @UseGuards(AdminGuard)
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(id);
  // }
}

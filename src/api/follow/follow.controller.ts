import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from "@nestjs/common";
import { FollowService } from "./follow.service";
import { CreateFollowDto } from "./dto/create-follow.dto";
import { DeleteFollowDto } from "./dto/delete-follow.dto";
import { UserGuard } from "../../guard/user/user.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("follow")
@ApiTags("follow")
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post("me")
  @ApiOperation({ summary: "Thêm mới follow - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateFollowDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 409, description: "Đã follow artist" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  createForUser(@Request() req: any, @Body() body: CreateFollowDto) {
    return this.followService.create(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách follower của artist" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_artist", required: false, description: "ID artist" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          follow_at: "2024-10-25T08:51:11.000Z",
          fullname: "Nguyễn Văn A",
          url_avatar: null,
        },
        {
          follow_at: "2024-10-25T08:51:11.000Z",
          fullname: "Nguyễn Văn B",
          url_avatar: null,
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: "Gửi sai request / Thiếu id_artist",
  })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  getForArtist(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
    @Query("id_artist") id_artist: string
  ) {
    return this.followService.findByArtist(limit, offset, id_artist);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Get("me")
  @ApiOperation({
    summary: "Lấy danh sách follow của user - Yêu cầu đăng nhập",
  })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          follow_at: "2024-10-25T08:51:11.000Z",
          name: "Sơn Tùng MTP",
          slug: "son-tung-mtp",
          url_cover:
            "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
          is_show: 1,
        },
        {
          follow_at: "2024-10-25T08:51:11.000Z",
          name: "Mỹ Tâm",
          slug: "my-tam",
          url_cover:
            "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727400292/ptjrn3zzdidsr88790at.jpg",
          is_show: 1,
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  getForUser(@Request() req: any) {
    return this.followService.findByUser(req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Delete("me")
  @ApiOperation({ summary: "Xóa follow - Yêu cầu đăng nhập" })
  @ApiBody({ type: DeleteFollowDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 409, description: "Chưa follow artist" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  removeForUser(@Request() req: any, @Body() body: DeleteFollowDto) {
    return this.followService.remove(body, req);
  }
}

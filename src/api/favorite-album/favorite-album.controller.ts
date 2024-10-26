import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from "@nestjs/common";
import { FavoriteAlbumService } from "./favorite-album.service";
import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
import { UserGuard } from "../../guard/user/user.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("favorite-album")
@ApiTags("favorite-album")
export class FavoriteAlbumController {
  constructor(private readonly favoriteAlbumService: FavoriteAlbumService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post("me")
  @ApiOperation({ summary: "Thêm mới album yêu thích - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateFavoriteAlbumDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 404, description: "ID album không tồn tại" })
  @ApiResponse({ status: 409, description: "Album đã tồn tại trong favorite" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateFavoriteAlbumDto, @Request() req: any) {
    return this.favoriteAlbumService.create(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Get("me")
  @ApiOperation({
    summary: "Lấy danh sách album yêu thích - Yêu cầu đăng nhập",
  })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          id_music_history: "5f5b9e96-92ae-11ef-858a-000e1e909940",
          id_music: "m0001",
          play_duration: 12,
          created_at: "2024-10-25T08:51:11.000Z",
          music: {
            id_music: "m0001",
            name: "Em của ngày hôm qua",
            slug: "em-cua-ngay-hom-qua",
            url_path:
              "http://res.cloudinary.com/dmiaubxsm/video/upload/v1727431913/nt1ptm3xf8lpfhljngpn.webm",
            url_cover:
              "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727430691/uhklis6zlvwdkxkzunv5.jpg",
            producer: "Long Halo",
            release_date: null,
            created_at: "2024-10-25T08:51:11.000Z",
            last_update: "2024-10-25T08:51:11.000Z",
            is_show: 1,
            composer: "Sơn Tùng MTP",
          },
        },
        {
          id_music_history: "5f5b9fbf-92ae-11ef-858a-000e1e909940",
          id_music: "m0002",
          play_duration: 12,
          created_at: "2024-10-25T08:51:11.000Z",
          music: {
            id_music: "m0002",
            name: "Chắc ai đó sẽ về",
            slug: "chac-ai-do-se-ve",
            url_path:
              "http://res.cloudinary.com/dmiaubxsm/video/upload/v1727431478/rpmqyciepjvsuwjesfky.mp3",
            url_cover:
              "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727430608/fy9iie84ei9sybtk8mxu.jpg",
            producer: "Nguyễn Hà",
            release_date: null,
            created_at: "2024-10-25T08:51:11.000Z",
            last_update: "2024-10-25T08:51:11.000Z",
            is_show: 1,
            composer: "Sơn Tùng MTP",
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string
  ) {
    return this.favoriteAlbumService.findAll(+limit, +offset, req);
  }

  @UseGuards(UserGuard)
  @Delete("me")
  @ApiOperation({ summary: "Xóa album yêu thích - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateFavoriteAlbumDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID album không tồn tại" })
  @ApiResponse({
    status: 409,
    description: "Album không tồn tại trong favorite",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  delete(@Request() req: any, @Body() body: CreateFavoriteAlbumDto) {
    return this.favoriteAlbumService.remove(req, body);
  }
}

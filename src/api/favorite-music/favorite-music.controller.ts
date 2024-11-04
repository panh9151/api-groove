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
import { FavoriteMusicService } from "./favorite-music.service";
import { CreateFavoriteMusicDto } from "./dto/favorite-music.dto";
import { UserGuard } from "../../guard/user/user.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("favorite-music")
@ApiTags("favorite-music")
export class FavoriteMusicController {
  constructor(private readonly favoriteMusicService: FavoriteMusicService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post("me")
  @ApiOperation({ summary: "Thêm mới yêu thích music - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateFavoriteMusicDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 404, description: "ID music không tồn tại" })
  @ApiResponse({ status: 409, description: "Music đã tồn tại trong favorite" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateFavoriteMusicDto, @Request() req: any) {
    return this.favoriteMusicService.create(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Get("me")
  @ApiOperation({
    summary: "Lấy danh sách music yêu thích - Yêu cầu đăng nhập",
  })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          last_update: "2024-10-25T08:51:11.000Z",
          artists: [
            {
              id_artist: "a0001",
              name: "Sơn Tùng MTP",
              slug: "son-tung-mtp",
              url_cover:
                "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
              created_at: "2024-10-25T08:51:11.000Z",
              last_update: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
          ],
          types: [],
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
          is_show: 1,
          composer: "Bùi Công Nam",
        },
        {
          last_update: "2024-10-25T08:51:11.000Z",
          artists: [
            {
              id_artist: "a0001",
              name: "Sơn Tùng MTP",
              slug: "son-tung-mtp",
              url_cover:
                "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
              created_at: "2024-10-25T08:51:11.000Z",
              last_update: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
          ],
          types: [
            {
              id_type: "t0001",
              name: "V-Pop",
              slug: "v-pop",
              created_at: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
            {
              id_type: "t0003",
              name: "Rap",
              slug: "rap",
              created_at: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
          ],
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
          is_show: 1,
          composer: "My Entertainment",
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
    return this.favoriteMusicService.findAll(+limit, +offset, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Delete("me")
  @ApiOperation({ summary: "Xóa yêu thích music - Yêu cầu đăng nhập" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({
    status: 409,
    description: "Music không tồn tại trong favorite",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  delete(@Request() req: any, @Query("id_music") id_music: string) {
    return this.favoriteMusicService.remove(req, id_music);
  }
}

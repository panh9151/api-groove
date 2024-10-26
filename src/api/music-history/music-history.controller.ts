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
import { MusicHistoryService } from "./music-history.service";
import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
import { UserGuard } from "../../guard/user/user.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("music-history")
@ApiTags("music-history")
export class MusicHistoryController {
  constructor(private readonly musicHistoryService: MusicHistoryService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @Post("me")
  @ApiOperation({
    summary: "Thêm mới lịch sử nghe - Có thể đăng nhập hoặc không",
  })
  @ApiBody({ type: CreateMusicHistoryDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 404, description: "ID music không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Request() req: any, @Body() body: CreateMusicHistoryDto) {
    return this.musicHistoryService.create(req, body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Get("me")
  @ApiOperation({ summary: "Lấy lịch sử nghe - Yêu cầu đăng nhập" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({
    name: "id_music_history",
    required: false,
    description: "ID bản ghi",
  })
  @ApiQuery({ name: "id_music", required: false, description: "ID bài hát" })
  @ApiQuery({
    name: "play_duration",
    required: false,
    description: "Thời gian nghe",
  })
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
            composer: "Bùi Công Nam",
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
            composer: "My Entertainment",
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 404, description: "ID music không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_music_history") id_music_history: string,
    @Query("id_music") id_music: string,
    @Query("play_duration") play_duration: string
  ) {
    return this.musicHistoryService.findAll(
      req,
      +limit,
      +offset,
      id_music_history,
      id_music,
      play_duration
    );
  }
}

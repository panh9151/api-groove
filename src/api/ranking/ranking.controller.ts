import { Controller, Get, Query } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("ranking")
@ApiTags("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Bảng xếp hạng" })
  @ApiQuery({
    name: "duration",
    required: true,
    description: "Thời gian xếp hạn (day, week, month)",
  })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          view: 1,
          favorite: 2,
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
          composer: "c0001",
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
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request / Thiếu duration" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("duration") duration: "day" | "month" | "week"
  ) {
    return this.rankingService.findAll(+limit, +offset, duration);
  }
}

import { Controller, Get, Query, Request } from "@nestjs/common";
import { SearchService } from "./search.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("search")
@ApiTags("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Tìm kiếm" })
  @ApiQuery({
    name: "search_text",
    required: true,
    description: "Chuỗi tìm kiếm",
  })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
        musicList: [
          {
            id_music: "6159d067-e3d5-48b8-96cb-55bd9f8bc30f",
            name: "name name 1",
            slug: null,
            url_path: "12345678987654321.com",
            url_cover: null,
            producer: null,
            release_date: "1899-11-30",
            created_at: "2024-10-25T11:22:26.000Z",
            last_update: "2024-10-26T04:24:17.000Z",
            is_show: 1,
            composer: null,
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
              {
                id_artist: "a0002",
                name: "Mỹ Tâm",
                slug: "my-tam",
                url_cover:
                  "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727400292/ptjrn3zzdidsr88790at.jpg",
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
                id_type: "t0002",
                name: "Bolero",
                slug: "bolero",
                created_at: "2024-10-25T08:51:11.000Z",
                is_show: 1,
              },
            ],
          },
        ],
        albumList: [
          {
            id_album: "al0001",
            name: "M-TP Ambition",
            slug: "mtp-ambition",
            url_cover:
              "https://i1.sndcdn.com/artworks-000157846189-57coq1-t500x500.jpg",
            release_date: null,
            publish_by: null,
            created_at: "2024-10-25T08:51:11.000Z",
            last_update: "2024-10-25T08:51:11.000Z",
            is_show: 1,
            id_artist: "a0001",
            artist: {
              id_artist: "a0001",
              name: "Sơn Tùng MTP",
              slug: "son-tung-mtp",
              url_cover:
                "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
              created_at: "2024-10-25T08:51:11.000Z",
              last_update: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
            musics: [
              {
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
                composer: "c0001",
                index_order: 0,
              },
            ],
          },
        ],
        artistList: [
          {
            id_artist: "a0002",
            name: "Mỹ Tâm",
            slug: "my-tam",
            url_cover:
              "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727400292/ptjrn3zzdidsr88790at.jpg",
            created_at: "2024-10-25T08:51:11.000Z",
            last_update: "2024-10-25T08:51:11.000Z",
            is_show: 1,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Gửi sai request / Thiếu search_text",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  search(@Request() req: any, @Query("search_text") search_text: string) {
    return this.searchService.findAll(req, search_text);
  }
}

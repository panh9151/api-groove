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
import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("music")
@ApiTags("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới music - Yêu cầu admin" })
  @ApiBody({ type: CreateMusicDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({
    status: 404,
    description: "ID artist / composer / type không tồn tại",
  })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateMusicDto) {
    return this.musicService.create(body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách music" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_music", required: false, description: "ID music" })
  @ApiQuery({ name: "name", required: false, description: "Tên bài hát" })
  @ApiQuery({ name: "slug", required: false, description: "Slug bài hát" })
  @ApiQuery({ name: "producer", required: false, description: "Nhà sản xuất" })
  @ApiQuery({
    name: "composer",
    required: false,
    description: "Người sáng tác",
  })
  @ApiQuery({
    name: "is_show",
    required: false,
    description: "Trạng thái hiển thị",
  })
  @ApiQuery({ name: "id_type", required: false, description: "ID type" })
  @ApiQuery({ name: "id_artist", required: false, description: "ID artist" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
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
              id_music: "6159d067-e3d5-48b8-96cb-55bd9f8bc30f",
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
            },
          ],
          types: [
            {
              id_music: "6159d067-e3d5-48b8-96cb-55bd9f8bc30f",
              id_type: "t0001",
              type: {
                id_type: "t0001",
                name: "V-Pop",
                slug: "v-pop",
                created_at: "2024-10-25T08:51:11.000Z",
                is_show: 1,
              },
            },
          ],
          favorite: 0,
          vỉew: 0,
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_music") id_music: string,
    @Query("name") name: string,
    @Query("slug") slug: string,
    @Query("producer") producer: string,
    @Query("composer") composer: string,
    @Query("is_show") is_show: string,
    @Query("id_type") id_type: string,
    @Query("id_artist") id_artist: string,
    @Request() req: any
  ) {
    return this.musicService.findAll(
      limit,
      offset,
      id_music,
      name,
      slug,
      producer,
      composer,
      is_show,
      id_type,
      id_artist,
      req
    );
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get(":id")
  @ApiOperation({ summary: "Lấy dữ liệu 1 music" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
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
            id_music: "6159d067-e3d5-48b8-96cb-55bd9f8bc30f",
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
          },
        ],
        types: [
          {
            id_music: "6159d067-e3d5-48b8-96cb-55bd9f8bc30f",
            id_type: "t0001",
            type: {
              id_type: "t0001",
              name: "V-Pop",
              slug: "v-pop",
              created_at: "2024-10-25T08:51:11.000Z",
              is_show: 1,
            },
          },
        ],
        favorite: 0,
        vỉew: 0,
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID type không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Param("id") id: string, @Request() req: any) {
    return this.musicService.findOne(id, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiBody({ type: UpdateMusicDto })
  @ApiOperation({ summary: "Cập nhật music - Yêu cầu admin" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({
    status: 404,
    description: "ID artist / composer / type không tồn tại",
  })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(id, updateMusicDto);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xóa music - Yêu cầu admin" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID type không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id: string) {
    return this.musicService.remove(id);
  }
}

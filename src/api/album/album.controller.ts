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
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("album")
@ApiTags("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách album" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_album", required: false, description: "ID album" })
  @ApiQuery({ name: "id_artist", required: false, description: "ID artist" })
  @ApiQuery({ name: "name", required: false, description: "Tên album" })
  @ApiQuery({ name: "slug", required: false, description: "Slug album" })
  @ApiQuery({
    name: "publish_by",
    required: false,
    description: "Nhà sản xuất",
  })
  @ApiQuery({
    name: "is_show",
    required: false,
    description: "Trạng thái hiển thị",
  })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
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
              index_order: 0,
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
            },
            {
              index_order: 0,
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
            },
          ],
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_album") id_album: string,
    @Query("id_artist") id_artist: string,
    @Query("name") name: string,
    @Query("slug") slug: string,
    @Query("publish_by") publish_by: string,
    @Query("is_show") is_show: 0 | 1
  ) {
    return this.albumService.findAll(
      req,
      +limit,
      +offset,
      id_album,
      id_artist,
      name,
      slug,
      publish_by,
      is_show
    );
  }

  ///////////////////////////////////////////////////////////////////////////////
  @ApiOperation({ summary: "Lấy 1 album" })
  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
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
            index_order: 0,
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
          },
          {
            index_order: 0,
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
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID album không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Param("id") id: string) {
    return this.albumService.findOne(id);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới album - Yêu cầu admin" })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 201, description: "ID music / artist không tồn tại" })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sửa album - Yêu cầu admin" })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({
    status: 404,
    description: "ID album / artist / music không tồn tại",
  })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() body: UpdateAlbumDto) {
    return this.albumService.update(id, body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xóa album - Yêu cầu admin" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID album không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id: string) {
    return this.albumService.remove(id);
  }
}

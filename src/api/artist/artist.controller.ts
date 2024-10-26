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
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import { FindQueryDto, ShowStatus } from "./dto/find-query.dto";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("artist")
@ApiTags("artist")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới artist - Yêu cầu admin" })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách artist" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_artist", required: false, description: "ID artist" })
  @ApiQuery({ name: "slug", required: false, description: "slug" })
  @ApiQuery({ name: "name", required: false, description: "Tên artist" })
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
          id_artist: "a0001",
          name: "Sơn Tùng MTP",
          slug: "son-tung-mtp",
          url_cover:
            "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
          created_at: "2024-10-25T08:51:11.000Z",
          last_update: "2024-10-25T08:51:11.000Z",
          followers: 1,
        },
        {
          id_artist: "a0002",
          name: "Mỹ Tâm",
          slug: "my-tam",
          url_cover:
            "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727400292/ptjrn3zzdidsr88790at.jpg",
          created_at: "2024-10-25T08:51:11.000Z",
          last_update: "2024-10-25T08:51:11.000Z",
          followers: 1,
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
    @Query("id_artist") id_artist: string,
    @Query("slug") slug: string,
    @Query("name") name: string,
    @Query("is_show") is_show: ShowStatus
  ) {
    const count = { limit, offset };
    const query: FindQueryDto = {
      id_artist,
      slug,
      name,
      is_show,
    };
    return this.artistService.findAll(req, count, query);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get(":id")
  @ApiOperation({ summary: "Lấy 1 artist" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
        id_artist: "a0001",
        name: "Sơn Tùng MTP",
        slug: "son-tung-mtp",
        url_cover:
          "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727401448/f2xmimptoidxl1k8a1zg.jpg",
        created_at: "2024-10-25T08:51:11.000Z",
        last_update: "2024-10-25T08:51:11.000Z",
        followers: 1,
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.artistService.findOne(req, id);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sửa artist - Yêu cầu admin" })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xóa artist - Yêu cầu admin" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID artist không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id: string) {
    return this.artistService.remove(id);
  }
}

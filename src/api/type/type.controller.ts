import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Request,
  UseGuards,
} from "@nestjs/common";
import { TypeService } from "./type.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("type")
@ApiTags("type")
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  ///////////////////////////////////////////////////////////////////
  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Tạo type mới - yêu cầu admin" })
  @ApiBody({ type: CreateTypeDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateTypeDto) {
    return this.typeService.create(body);
  }

  ////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách type" })
  @ApiQuery({ name: "limit", required: false, description: "Số lượng bản ghi" })
  @ApiQuery({ name: "offset", required: false, description: "Vị trí bắt đầu" })
  @ApiQuery({ name: "id_type", required: false, description: "ID type" })
  @ApiQuery({ name: "name", required: false, description: "Tên type" })
  @ApiQuery({ name: "slug", required: false, description: "slug type" })
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
          id_type: "t0001",
          name: "V-Pop",
          slug: "v-pop",
          created_at: "2024-10-25T08:51:11.000Z",
          is_show: 1,
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  async findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_type") id_type: string,
    @Query("name") name: string,
    @Query("slug") slug: string,
    @Query("is_show") is_show: 0 | 1
  ) {
    return this.typeService.findAll(
      limit,
      offset,
      id_type,
      name,
      slug,
      is_show,
      req
    );
  }

  //////////////////////////////////////////////////////////////////////
  @Get(":id")
  @ApiOperation({ summary: "Lấy type theo id" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
        id_type: "t0001",
        name: "V-Pop",
        slug: "v-pop",
        created_at: "2024-10-25T08:51:11.000Z",
        is_show: 1,
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 404, description: "ID type không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.typeService.findOne(id, req);
  }

  //////////////////////////////////////////////////////////////////////
  @Patch(":id")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Cập nhật type - Yêu cầu admin" })
  @ApiBody({ type: UpdateTypeDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID type không tồn tại" })
  @ApiResponse({ status: 409, description: "Slug đã tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() body: UpdateTypeDto) {
    return this.typeService.update(id, body);
  }

  //////////////////////////////////////////////////////////////////////
  @Delete(":id")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Xóa type - Yêu cầu admin" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID type không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id: string) {
    return this.typeService.remove(id);
  }
}

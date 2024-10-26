import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ComposerService } from "./composer.service";
import { CreateComposerDto } from "./dto/create-composer.dto";
import { UpdateComposerDto } from "./dto/update-composer.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("composer")
@ApiTags("composer")
export class ComposerController {
  constructor(private readonly composerService: ComposerService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới nhạc sĩ - Yêu cầu admin" })
  @ApiBody({ type: CreateComposerDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateComposerDto) {
    return this.composerService.create(body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách nhạc sĩ" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          id_composer: "c0001",
          name: "Sơn Tùng MTP",
          created_at: "2024-10-25T08:51:11.000Z",
          last_update: "2024-10-25T08:51:11.000Z",
        },
        {
          id_composer: "c0002",
          name: "Phan Mạnh Quỳnh",
          created_at: "2024-10-25T08:51:11.000Z",
          last_update: "2024-10-25T08:51:11.000Z",
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll() {
    return this.composerService.findAll();
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get(":id")
  @ApiOperation({ summary: "Lấy 1 nhạc sĩ" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: {
        id_composer: "c0001",
        name: "Sơn Tùng MTP",
        created_at: "2024-10-25T08:51:11.000Z",
        last_update: "2024-10-25T08:51:11.000Z",
      },
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID composer không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findOne(@Param("id") id: string) {
    return this.composerService.findOne(id);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sửa nhạc sĩ - Yêu cầu admin" })
  @ApiBody({ type: UpdateComposerDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID composer không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Param("id") id: string, @Body() body: UpdateComposerDto) {
    return this.composerService.update(id, body);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID composer không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id: string) {
    return this.composerService.remove(id);
  }
}

import { UserGuard } from "./../../guard/user/user.guard";
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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comment")
@ApiTags("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post()
  @ApiOperation({ summary: "Thêm mới comment - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({
    status: 201,
    description: "Thành công",
    example: {
      data: [
        {
          user: "Nguyễn Văn A",
          id_comment: "1f3f3479-96bd-11ef-858a-000e1e909940",
          text: "Comment 2",
          created_at: "2024-10-30T12:46:44.000Z",
        },
        {
          user: "Nguyễn Văn A",
          id_comment: "1f3f3507-96bd-11ef-858a-000e1e909940",
          text: "Comment 3",
          created_at: "2024-10-30T12:46:44.000Z",
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Body() body: CreateCommentDto, @Request() req: any) {
    return this.commentService.create(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @Get()
  @ApiOperation({ summary: "Lấy danh sách comment của id_music" })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [],
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request / Thiếu id_music" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(@Query("id_music") id_music: string) {
    return this.commentService.findAll(id_music);
  }

  /////////////////////////////////////////////////////////////////////////////
  @Get("me")
  @UseGuards(UserGuard)
  findMe(@Request() req: any) {
    return this.commentService.findMe(req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Delete(":id")
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({ status: 404, description: "ID comment không tồn tại" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Param("id") id_comment: string, @Request() req: any) {
    return this.commentService.remove(id_comment, req);
  }
}

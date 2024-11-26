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
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { UserGuard } from "../../guard/user/user.guard";
import { CreateAddMusicDto } from "./dto/create-add-music.dto";
import { DeletePlaylistDto } from "./dto/delete-playlist.dto";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DeleteMusicDto } from "./dto/delete-music.dto";

@Controller("playlist")
@ApiTags("ranking")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  ///////////////////////////////////////////////////////////////////////////////
  // MusicPlaylist
  @UseGuards(UserGuard)
  @Delete("add-music")
  @ApiOperation({ summary: "Xóa nhạc trong playlist - Yêu cầu đăng nhập" })
  @ApiBody({ type: DeleteMusicDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({
    status: 404,
    description:
      "Music không tồn tại / ID playlist không tồn tại hoặc user không sở hữu playlist",
  })
  @ApiResponse({
    status: 409,
    description: "Music không tồn tại trong playlist",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  removeMusic(@Query("id_playlist") id_playlist: string, @Query("id_music") id_music: string, @Request() req: any) {
    return this.playlistService.removeMusic(req, id_music, id_playlist);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post("add-music")
  @ApiOperation({ summary: "Thêm nhạc vào playlist - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreateAddMusicDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({
    status: 404,
    description:
      "Music không tồn tại / ID playlist không tồn tại hoặc user không sở hữu playlist",
  })
  @ApiResponse({ status: 409, description: "Music đã tồn tại trong playlist" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  addMusic(@Body() body: CreateAddMusicDto, @Request() req: any) {
    return this.playlistService.addMusic(body, req);
  }

  // Playlist
  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Post("me")
  @ApiOperation({ summary: "Thêm mới playlist - Yêu cầu đăng nhập" })
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({ status: 201, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  create(@Request() req: any, @Body() body: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Get("me")
  @ApiOperation({ summary: "Lấy danh sách playlist - Yêu cầu đăng nhập" })
  @ApiQuery({
    name: "id_playlist",
    required: false,
    description: "ID playlist",
  })
  @ApiResponse({
    status: 200,
    description: "Thành công",
    example: {
      data: [
        {
          id_playlist: "p0001",
          name: "Play list 1",
          playlist_index: 0,
          created_at: "2024-10-25T08:51:11.000Z",
          last_update: "2024-10-25T08:51:11.000Z",
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
            {
              id_music: "m0006",
              name: "Lạc trôi",
              slug: "lac-troi",
              url_path:
                "http://res.cloudinary.com/dmiaubxsm/video/upload/v1727431817/mnriqsdarjeas9isj5wd.webm",
              url_cover:
                "http://res.cloudinary.com/dmiaubxsm/image/upload/v1727430741/jzxoogccndvmrqyaduqo.jpg",
              producer: "Triple D, Masew",
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
    },
  })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  findAll(@Request() req: any, @Query("id_playlist") id_playlist: string) {
    return this.playlistService.findAllPlaylist(req, id_playlist);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Patch("me")
  @ApiOperation({ summary: "Cập nhật playlist - Yêu cầu đăng nhập" })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({ status: 403, description: "Chưa đăng nhập" })
  @ApiResponse({
    status: 404,
    description: "ID playlist không tồn tại hoặc user không sở hữu playlist",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  update(@Body() body: UpdatePlaylistDto, @Request() req: any) {
    return this.playlistService.updatePlaylist(body, req);
  }

  ///////////////////////////////////////////////////////////////////////////////
  @UseGuards(UserGuard)
  @Delete("me")
  @ApiOperation({ summary: "Xóa playlist - Yêu cầu đăng nhập" })
  @ApiResponse({ status: 200, description: "Thành công" })
  @ApiResponse({ status: 400, description: "Gửi sai request" })
  @ApiResponse({
    status: 403,
    description: "Không đủ quyền hạn / Chưa đăng nhập",
  })
  @ApiResponse({
    status: 404,
    description: "ID playlist không tồn tại hoặc user không sở hữu playlist",
  })
  @ApiResponse({ status: 500, description: "Lỗi server" })
  remove(@Query("id_playlist") id_playlist: string, @Request() req: any) {
    return this.playlistService.removePlaylist(id_playlist, req);
  }
}

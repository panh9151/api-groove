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

@Controller("playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  // MusicPlaylist
  @UseGuards(UserGuard)
  @Delete("add-music")
  removeMusic(@Body() body: CreateAddMusicDto, @Request() req: any) {
    return this.playlistService.removeMusic(req, body);
  }

  @UseGuards(UserGuard)
  @Post("add-music")
  addMusic(@Body() body: CreateAddMusicDto, @Request() req: any) {
    return this.playlistService.addMusic(body, req);
  }

  // Playlist
  @UseGuards(UserGuard)
  @Post("me")
  create(@Request() req: any, @Body() body: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(body, req);
  }

  @UseGuards(UserGuard)
  @Get("me")
  findAll(@Request() req: any, @Query("id_playlist") id_playlist: string) {
    return this.playlistService.findAllPlaylist(req, id_playlist);
  }

  @UseGuards(UserGuard)
  @Patch("me")
  update(@Body() body: UpdatePlaylistDto, @Request() req: any) {
    return this.playlistService.updatePlaylist(body, req);
  }

  @UseGuards(UserGuard)
  @Delete("me")
  remove(@Body() body: DeletePlaylistDto, @Request() req: any) {
    return this.playlistService.removePlaylist(body, req);
  }
}

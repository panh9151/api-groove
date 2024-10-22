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
import { MusicHistoryService } from "./music-history.service";
import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
import { UserGuard } from "../../guard/user/user.guard";

@Controller("music-history")
export class MusicHistoryController {
  constructor(private readonly musicHistoryService: MusicHistoryService) {}

  @UseGuards(UserGuard)
  @Post("me")
  create(@Request() req: any, @Body() body: CreateMusicHistoryDto) {
    return this.musicHistoryService.create(req, body);
  }

  @UseGuards(UserGuard)
  @Get("me")
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_music_history") id_music_history: string,
    @Query("id_music") id_music: string,
    @Query("play_duration") play_duration: string
  ) {
    return this.musicHistoryService.findAll(
      req,
      +limit,
      +offset,
      id_music_history,
      id_music,
      play_duration
    );
  }
}

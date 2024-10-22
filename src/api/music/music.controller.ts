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
import { AdminGuard } from "src/guard/admin/admin.guard";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateMusicDto) {
    return this.musicService.create(body);
  }

  @Get()
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_music") id_music: string,
    @Query("name") name: string,
    @Query("slug") slug: string,
    @Query("total_duration") total_duration: string,
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
      total_duration,
      producer,
      composer,
      is_show,
      id_type,
      id_artist,
      req
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Request() req: any) {
    return this.musicService.findOne(id, req);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(id, updateMusicDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.musicService.remove(id);
  }
}

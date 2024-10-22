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
import { AdminGuard } from "src/guard/admin/admin.guard";

@Controller("album")
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
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

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.albumService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateAlbumDto) {
    return this.albumService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.albumService.remove(id);
  }
}

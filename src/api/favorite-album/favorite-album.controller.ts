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
import { FavoriteAlbumService } from "./favorite-album.service";
import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
import { UserGuard } from "src/guard/user/user.guard";

@Controller("favorite-album")
export class FavoriteAlbumController {
  constructor(private readonly favoriteAlbumService: FavoriteAlbumService) {}

  @UseGuards(UserGuard)
  @Post("me")
  create(@Body() body: CreateFavoriteAlbumDto, @Request() req: any) {
    return this.favoriteAlbumService.create(body, req);
  }

  @UseGuards(UserGuard)
  @Get("me")
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string
  ) {
    return this.favoriteAlbumService.findAll(+limit, +offset, req);
  }

  @UseGuards(UserGuard)
  @Delete("me")
  delete(@Request() req: any, @Body() body: CreateFavoriteAlbumDto) {
    return this.favoriteAlbumService.remove(req, body);
  }
}

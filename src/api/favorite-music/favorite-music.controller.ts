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
import { FavoriteMusicService } from "./favorite-music.service";
import { CreateFavoriteMusicDto } from "./dto/favorite-music.dto";
import { UserGuard } from "src/guard/user/user.guard";

@Controller("favorite-music")
export class FavoriteMusicController {
  constructor(private readonly favoriteMusicService: FavoriteMusicService) {}

  @UseGuards(UserGuard)
  @Post("me")
  create(@Body() body: CreateFavoriteMusicDto, @Request() req: any) {
    return this.favoriteMusicService.create(body, req);
  }

  @UseGuards(UserGuard)
  @Get("me")
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string
  ) {
    return this.favoriteMusicService.findAll(+limit, +offset, req);
  }

  @UseGuards(UserGuard)
  @Delete("me")
  delete(@Request() req: any, @Body() body: CreateFavoriteMusicDto) {
    return this.favoriteMusicService.remove(req, body);
  }
}

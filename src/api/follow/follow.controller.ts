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
import { FollowService } from "./follow.service";
import { CreateFollowDto } from "./dto/create-follow.dto";
import { UpdateFollowDto } from "./dto/update-follow.dto";
import { UserGuard } from "../../guard/user/user.guard";

@Controller("follow")
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(UserGuard)
  @Post("me")
  createForUser(@Request() req: any, @Body() body: CreateFollowDto) {
    return this.followService.create(body, req);
  }

  @Get()
  getForArtist(
    @Query("limit") limit: number,
    @Query("offset") offset: number,
    @Query("id_artist") id_artist: string
  ) {
    return this.followService.findByArtist(limit, offset, id_artist);
  }

  @UseGuards(UserGuard)
  @Get("me")
  getForUser(@Request() req: any) {
    return this.followService.findByUser(req);
  }

  @UseGuards(UserGuard)
  @Delete("me")
  removeForUser(@Request() req: any, @Body() body: UpdateFollowDto) {
    return this.followService.remove(body, req);
  }
}

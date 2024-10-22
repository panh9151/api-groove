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
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { AdminGuard } from "src/guard/admin/admin.guard";
import { FindQueryDto, ShowStatus } from "./dto/find-query.dto";

@Controller("artist")
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_artist") id_artist: string,
    @Query("slug") slug: string,
    @Query("name") name: string,
    @Query("is_show") is_show: ShowStatus
  ) {
    const count = { limit, offset };
    const query: FindQueryDto = {
      id_artist,
      slug,
      name,
      is_show,
    };
    return this.artistService.findAll(req, count, query);
  }

  @Get(":id")
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.artistService.findOne(req, id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.artistService.remove(id);
  }
}

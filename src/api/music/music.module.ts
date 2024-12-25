import { MusicArtist } from "./../../api-entity/MusicArtist.entity";
import { Type } from "./../../api-entity/Type.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Composer } from "../../api-entity/Composer.entity";
import { Lyrics } from "../../api-entity/Lyrics.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Music,
      MusicArtist,
      MusicTypeDetail,
      Artist,
      Type,
      Composer,
      Lyrics,
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}

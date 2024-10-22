import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "src/api-entity/Music.entity";
import { Lyrics } from "src/api-entity/Lyrics.entity";
import { MusicArtist } from "src/api-entity/MusicArtist.entity";
import { MusicTypeDetail } from "src/api-entity/MusicTypeDetail.entity";
import { Type } from "src/api-entity/Type.entity";
import { Artist } from "src/api-entity/Artist.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Music,
      Lyrics,
      MusicArtist,
      MusicTypeDetail,
      Artist,
      Type,
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}

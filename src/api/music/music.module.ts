import { MusicArtist } from "./../../api-entity/MusicArtist.entity";
import { Type } from "./../../api-entity/Type.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { Lyrics } from "./../../api-entity/Lyrics.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

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

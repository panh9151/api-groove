import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/api-entity/Album.entity";
import { Artist } from "src/api-entity/Artist.entity";
import { Music } from "src/api-entity/Music.entity";
import { MusicAlbum } from "src/api-entity/MusicAlbum.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Music, MusicAlbum])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}

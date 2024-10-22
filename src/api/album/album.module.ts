import { MusicAlbum } from "./../../api-entity/MusicAlbum.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { Album } from "./../../api-entity/Album.entity";
import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Music, MusicAlbum])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}

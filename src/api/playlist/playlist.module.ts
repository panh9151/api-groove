import { Module } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "../../../src/api-entity/Playlist.entity";
import { Music } from "../../api-entity/Music.entity";
import { MusicPlaylistDetail } from "../../api-entity/MusicPlaylist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Music, MusicPlaylistDetail])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}

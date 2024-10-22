import { Module } from "@nestjs/common";
import { FavoriteAlbumService } from "./favorite-album.service";
import { FavoriteAlbumController } from "./favorite-album.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/api-entity/Album.entity";
import { FavoriteAlbumDetail } from "src/api-entity/FavoriteAlbumDetail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Album, FavoriteAlbumDetail])],
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService],
})
export class FavoriteAlbumModule {}

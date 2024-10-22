import { Album } from "./../../api-entity/Album.entity";
import { FavoriteAlbumDetail } from "./../../api-entity/FavoriteAlbumDetail.entity";
import { Module } from "@nestjs/common";
import { FavoriteAlbumService } from "./favorite-album.service";
import { FavoriteAlbumController } from "./favorite-album.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Album, FavoriteAlbumDetail])],
  controllers: [FavoriteAlbumController],
  providers: [FavoriteAlbumService],
})
export class FavoriteAlbumModule {}

import { Module } from "@nestjs/common";
import { FavoriteMusicService } from "./favorite-music.service";
import { FavoriteMusicController } from "./favorite-music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteMusic } from "src/api-entity/FavoriteMusic.entity";
import { Music } from "src/api-entity/Music.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMusic, Music])],
  controllers: [FavoriteMusicController],
  providers: [FavoriteMusicService],
})
export class FavoriteMusicModule {}

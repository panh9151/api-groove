import { FavoriteMusic } from "./../../api-entity/FavoriteMusic.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Module } from "@nestjs/common";
import { FavoriteMusicService } from "./favorite-music.service";
import { FavoriteMusicController } from "./favorite-music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMusic, Music])],
  controllers: [FavoriteMusicController],
  providers: [FavoriteMusicService],
})
export class FavoriteMusicModule {}

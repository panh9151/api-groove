import { Artist } from "./../../api-entity/Artist.entity";
import { Album } from "./../../api-entity/Album.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Music, Album, Artist])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

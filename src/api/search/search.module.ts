import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/api-entity/Album.entity";
import { Artist } from "src/api-entity/Artist.entity";
import { Music } from "src/api-entity/Music.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Music, Album, Artist])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

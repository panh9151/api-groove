import { Module } from "@nestjs/common";
import { MusicHistoryService } from "./music-history.service";
import { MusicHistoryController } from "./music-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MusicHistory } from "src/api-entity/MusicHistory.entity";
import { Music } from "src/api-entity/Music.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MusicHistory, Music])],
  controllers: [MusicHistoryController],
  providers: [MusicHistoryService],
})
export class MusicHistoryModule {}

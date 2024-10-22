import { Music } from "./../../api-entity/Music.entity";
import { MusicHistory } from "./../../api-entity/MusicHistory.entity";
import { Module } from "@nestjs/common";
import { MusicHistoryService } from "./music-history.service";
import { MusicHistoryController } from "./music-history.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MusicHistory, Music])],
  controllers: [MusicHistoryController],
  providers: [MusicHistoryService],
})
export class MusicHistoryModule {}

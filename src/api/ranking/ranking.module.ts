import { Music } from "./../../api-entity/Music.entity";
import { Module } from "@nestjs/common";
import { RankingService } from "./ranking.service";
import { RankingController } from "./ranking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}

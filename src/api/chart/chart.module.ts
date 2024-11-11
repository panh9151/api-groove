import { MusicHistory } from "./../../api-entity/MusicHistory.entity";
import { Module } from "@nestjs/common";
import { ChartService } from "./chart.service";
import { ChartController } from "./chart.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([MusicHistory])],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}

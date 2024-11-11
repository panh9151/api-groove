import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { Type } from "./../../api-entity/Type.entity";
import { Module } from "@nestjs/common";
import { TypeService } from "./type.service";
import { TypeController } from "./type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Type, MusicTypeDetail])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}

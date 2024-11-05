import { Type } from "./../../api-entity/Type.entity";
import { Module } from "@nestjs/common";
import { TopTypeService } from "./top-type.service";
import { TopTypeController } from "./top-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TopTypeController],
  providers: [TopTypeService],
})
export class TopTypeModule {}

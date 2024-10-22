import { Module } from "@nestjs/common";
import { UpdateInforService } from "./update-infor.service";
import { UpdateInforController } from "./update-infor.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UpdateInforEntity } from "./entities/update-infor.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UpdateInforEntity])],
  controllers: [UpdateInforController],
  providers: [UpdateInforService],
})
export class UpdateInforModule {}

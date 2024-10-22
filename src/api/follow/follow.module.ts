import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follow } from "src/api-entity/Follow.entity";
import { Artist } from "src/api-entity/Artist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Follow, Artist])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}

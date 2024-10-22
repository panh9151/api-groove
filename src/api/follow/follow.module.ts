import { Artist } from "./../../api-entity/Artist.entity";
import { Follow } from "./../../api-entity/Follow.entity";
import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Follow, Artist])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}

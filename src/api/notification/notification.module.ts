import { Album } from "./../../api-entity/Album.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Follow } from "./../artist/entities/follow.entity";
import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Album, Music, Follow])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

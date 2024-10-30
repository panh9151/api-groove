import { Music } from "./../../api-entity/Music.entity";
import { Comment } from "./../../api-entity/Comment.entity";
import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Music])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

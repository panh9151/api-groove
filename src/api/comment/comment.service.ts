import { Music } from "./../../api-entity/Music.entity";
import { Comment } from "../../api-entity/Comment.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>
  ) {}

  async create(body: CreateCommentDto, req: any) {
    const id_user = req.user.id_user;
    const { text, id_music } = body;

    const music = await this.musicRepo.find({ where: { id_music } });
    if (music.length !== 1) throw new NotFoundException("ID music not found");

    const newComment = this.commentRepo.create({
      text,
      id_music,
      id_user,
    });
    const saveComment = await this.commentRepo.save(newComment);
    return { newID: saveComment.id_comment };
  }

  async findAll(id_music: string) {
    if (!id_music) throw new NotFoundException("ID music not found");

    const music = await this.musicRepo.find({ where: { id_music } });
    if (music.length !== 1) throw new NotFoundException("ID music not found");

    let commentList: any[] = await this.commentRepo.find({
      where: { id_music, is_show: 1 },
      select: ["id_comment", "created_at", "text", "user"],
      relations: ["user"],
    });

    commentList = commentList.map((comment) => {
      const user = comment.user.fullname;
      const user_url = comment.user.url_avatar;
      const id_user = comment.user.id_user;
      delete comment.user;
      return {
        user,
        id_user,
        ...comment,
      };
    });

    return { data: commentList };
  }

  async remove(id_comment, req) {
    const id_user = req.user.id_user;

    const comment = await this.commentRepo.find({
      where: { id_comment, id_user },
    });
    if (comment.length !== 1) throw new NotFoundException("Comment not found");

    const result = await this.commentRepo.delete({ id_comment, id_user });
    if (result.affected === 0) {
      throw new NotFoundException(`Comment not found`);
    }
    return { message: `Comment removed successfully` };
  }
}

import { Injectable } from "@nestjs/common";

@Injectable()
export class CompletePaymentService {
  const;
  // Add data to DB

  // Send mail to admin
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>
  ) {}

  async getCompletePayment(body: CreateCommentDto, req: any) {
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
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MusicHistory } from "src/api-entity/MusicHistory.entity";
import { Repository } from "typeorm";
import { Music } from "src/api-entity/Music.entity";

@Injectable()
export class MusicHistoryService {
  constructor(
    @InjectRepository(MusicHistory)
    private readonly historyRepo: Repository<MusicHistory>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>
  ) {}

  async create(req: any, body: CreateMusicHistoryDto) {
    const id_user = req.user.id_user;
    const { id_music, play_duration } = body;
    // Check existing music
    const music = await this.musicRepo.find({ where: { id_music } });
    if (!music || music.length !== 1) {
      throw new NotFoundException("Music not found");
    }

    // Update db
    const newHistory = this.historyRepo.create({
      id_music,
      play_duration,
      id_user,
    });
    const saveHistory = await this.historyRepo.save(newHistory);

    return { newID: saveHistory.id_music_history };
  }

  async findAll(
    req: any,
    limit: number,
    offset: number,
    id_music_history: string,
    id_music: string,
    play_duration: string
  ) {
    const id_user = req.user.id_user;
    const historyRepo = this.historyRepo
      .createQueryBuilder("history")
      .select([
        "history.id_music_history",
        "history.id_music",
        "history.play_duration",
        "history.created_at",
      ])
      .leftJoinAndSelect("history.music", "music")
      .andWhere("history.id_user = :id_user", { id_user })
      .andWhere("music.is_show = 1");

    // Apply filters based on the parameters
    id_music &&
      historyRepo.andWhere("music.id_music = :id_music", { id_music });
    id_music_history &&
      historyRepo.andWhere("history.id_music_history = :id_music_history", {
        id_music_history,
      });
    play_duration &&
      historyRepo.andWhere("history.play_duration = :play_duration", {
        play_duration,
      });

    // Apply limit and offset
    limit && historyRepo.take(limit);
    offset && historyRepo.skip(offset);

    const history = await historyRepo.getMany();
    return { data: history };
  }
}

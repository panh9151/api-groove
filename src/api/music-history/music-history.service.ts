import { MusicHistory } from "./../../api-entity/MusicHistory.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MusicHistoryService {
  constructor(
    @InjectRepository(MusicHistory)
    private readonly historyRepo: Repository<MusicHistory>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>
  ) {}

  async create(req: any, body: CreateMusicHistoryDto) {
    const id_user = req?.user?.id_user || null;
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
      .leftJoinAndSelect("music.id_composer", "composer")
      .andWhere("history.id_user = :id_user", { id_user })
      .andWhere("music.is_show = 1");

    // Apply filters based on the parameters
    const getByParam = (
      param,
      value,
      repo,
      absolute: boolean = false,
      queryBy: "and" | "or" = "and"
    ) => {
      if (value !== null && value !== undefined && value !== "") {
        if (absolute === true) value = `%${value}%`;
        if (queryBy === "and") {
          repo.andWhere(`${param} = :value`, {
            value,
          });
        } else {
          repo.orWhere(`${param} = :value`, {
            value,
          });
        }
      }
    };

    getByParam("music.id_music", id_music, historyRepo);
    getByParam("history.id_music_history", id_music_history, historyRepo);
    getByParam("history.play_duration", play_duration, historyRepo);

    // Apply limit and offset
    limit && historyRepo.take(limit);
    offset && historyRepo.skip(offset);

    // Parse data
    const history: any[] = await historyRepo.getMany();
    history.map((h) => {
      h.music.composer = h.music.id_composer?.name || null;
      delete h.music.id_composer;
      return h;
    });

    return { data: history };
  }
}

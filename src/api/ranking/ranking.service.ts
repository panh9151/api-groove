import { Music } from "./../../api-entity/Music.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Music) private readonly musicRepo: Repository<Music>
  ) {}

  async findAll(
    limit: number,
    offset: number,
    duration: "day" | "month" | "week"
  ) {
    if (!duration) throw new BadRequestException("Missing duration");
    if (!limit && limit !== 0) limit = 100;
    if (!offset && offset !== 0) offset = 0;

    const rankingMusicRepo = this.musicRepo
      .createQueryBuilder("music")
      .leftJoinAndSelect("music.musicHistories", "mh") // Join bảng lịch sử nghe nhạc (music history)
      .leftJoinAndSelect("music.favoriteMusics", "fm") // Join bảng yêu thích (favorite music)
      .leftJoinAndSelect("music.artists", "mad") // Join bảng quan hệ nhiều-nhiều giữa music và artist
      .leftJoinAndSelect("mad.artist", "a") // Join bảng nghệ sĩ (artist)
      .leftJoinAndSelect("music.types", "mtd") // Join bảng quan hệ nhiều-nhiều giữa music và type
      .leftJoinAndSelect("mtd.type", "ty") // Join bảng thể loại (type)
      .leftJoinAndSelect("music.lyrics", "lyrics");

    // Apply duration
    if (duration === "day") {
      rankingMusicRepo.andWhere(
        `mh.created_at BETWEEN NOW() - INTERVAL 1 DAY AND NOW()`
      );
    } else if (duration === "week") {
      rankingMusicRepo.andWhere(
        `mh.created_at BETWEEN NOW() - INTERVAL 1 WEEK AND NOW()`
      );
    } else if (duration === "month") {
      rankingMusicRepo.andWhere(
        `mh.created_at BETWEEN NOW() - INTERVAL 1 MONTH AND NOW()`
      );
    }

    // Apply limit and offset
    limit && rankingMusicRepo.take(limit);
    offset && rankingMusicRepo.skip(offset);

    let rankingMusicList: any[] = await rankingMusicRepo.getMany();

    rankingMusicList = rankingMusicList.map((music) => {
      const view = music.musicHistories.length;
      const favorite = music.favoriteMusics.length;
      delete music.musicHistories;
      delete music.favoriteMusics;

      music.types = music.types.map((type) => type.type);
      music.artists = music.artists.map((artist) => artist.artist);

      return {
        view,
        favorite,
        ...music,
      };
    });

    return { data: rankingMusicList };
  }
}

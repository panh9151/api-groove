import { Type } from "./../../api-entity/Type.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class TopTypeService {
  constructor(
    @InjectRepository(Type) private readonly typeRepo: Repository<Type>
  ) {}

  async find(limit) {
    let type: any[] = await this.typeRepo
      .createQueryBuilder("type")
      .leftJoinAndSelect("type.music", "mtd")
      .leftJoinAndSelect("mtd.music", "music")
      .leftJoinAndSelect("music.musicHistories", "history")
      .getMany();

    type = type.map((t) => {
      t.music = t.music.map((m) => {
        m = m.music;
        delete m.music;
        return m;
      });

      t.views =
        t.music.reduce((acc, cur) => {
          const temp = acc + cur.musicHistories.length;
          cur.view = cur.musicHistories.length;
          delete cur.musicHistories;
          return temp;
        }, 0) || 0;

      return t;
    });

    type.sort((a, b) => b.view - a.view);

    return type.slice(0, limit);
  }
}

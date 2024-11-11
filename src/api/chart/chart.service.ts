import { MusicHistory } from "./../../api-entity/MusicHistory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class ChartService {
  constructor(
    @InjectRepository(MusicHistory)
    private readonly musicHistoryRepo: Repository<MusicHistory>
  ) {}

  async findAll() {
    const allHistory = await this.musicHistoryRepo
      .createQueryBuilder("mh")
      .andWhere("mh.created_at >= NOW() - INTERVAL 30 DAY")
      .andWhere("mh.created_at < NOW()")
      .getMany();

    const result = allHistory.reduce((acc, item) => {
      const day = new Date(item.created_at).toISOString().split("T")[0]; // Extract date part in YYYY-MM-DD format
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const formattedResult = Object.entries(result)
      .map(([day, view]) => ({ day, view }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()); // Simplified sorting

    return formattedResult;
  }
}

import { Repository } from "typeorm";
import { Music } from "src/api-entity/Music.entity";
export declare class RankingService {
    private readonly musicRepo;
    constructor(musicRepo: Repository<Music>);
    findAll(limit: number, offset: number, duration: "day" | "month" | "week"): Promise<{
        data: any[];
    }>;
}

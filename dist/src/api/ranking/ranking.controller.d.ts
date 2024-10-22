import { RankingService } from "./ranking.service";
export declare class RankingController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    findAll(limit: string, offset: string, duration: "day" | "month" | "week"): Promise<{
        data: any[];
    }>;
}

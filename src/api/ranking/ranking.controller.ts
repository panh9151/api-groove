import { Controller, Get, Query } from "@nestjs/common";
import { RankingService } from "./ranking.service";

@Controller("ranking")
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  findAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("duration") duration: "day" | "month" | "week"
  ) {
    return this.rankingService.findAll(+limit, +offset, duration);
  }
}

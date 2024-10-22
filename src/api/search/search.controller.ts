import { Controller, Get, Query, Request } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Request() req: any, @Query("search_text") search_text: string) {
    return this.searchService.findAll(req, search_text);
  }
}

import { Controller, Get, Query } from "@nestjs/common";
import { TopTypeService } from "./top-type.service";
@Controller("top-type")
export class TopTypeController {
  constructor(private readonly topTypeService: TopTypeService) {}

  @Get()
  findAll(@Query("limit") limit: number = 3) {
    return this.topTypeService.find(limit);
  }
}

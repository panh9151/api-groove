import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TopTypeService } from "./top-type.service";
import { CreateTopTypeDto } from "./dto/create-top-type.dto";
import { UpdateTopTypeDto } from "./dto/update-top-type.dto";

@Controller("top-type")
export class TopTypeController {
  constructor(private readonly topTypeService: TopTypeService) {}

  @Get()
  findAll(@Query("limit") limit: number = 3) {
    return this.topTypeService.find(limit);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  Request,
  UseGuards,
} from "@nestjs/common";
import { TypeService } from "./type.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { AdminGuard } from "../../guard/admin/admin.guard";

@Controller("type")
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() body: CreateTypeDto) {
    return this.typeService.create(body);
  }

  @Get()
  async findAll(
    @Request() req: any,
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("id_type") id_type: string,
    @Query("name") name: string,
    @Query("slug") slug: string,
    @Query("is_show") is_show: 0 | 1
  ) {
    return this.typeService.findAll(
      limit,
      offset,
      id_type,
      name,
      slug,
      is_show,
      req
    );
  }

  @Get(":id")
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.typeService.findOne(id, req);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  update(@Param("id") id: string, @Body() body: UpdateTypeDto) {
    return this.typeService.update(id, body);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  remove(@Param("id") id: string) {
    return this.typeService.remove(id);
  }
}

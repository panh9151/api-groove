import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ComposerService } from "./composer.service";
import { CreateComposerDto } from "./dto/create-composer.dto";
import { UpdateComposerDto } from "./dto/update-composer.dto";
import { AdminGuard } from "src/guard/admin/admin.guard";

@Controller("Composer")
export class ComposerController {
  constructor(private readonly composerService: ComposerService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateComposerDto) {
    return this.composerService.create(body);
  }

  @Get()
  findAll() {
    return this.composerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.composerService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateComposerDto) {
    return this.composerService.update(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.composerService.remove(id);
  }
}

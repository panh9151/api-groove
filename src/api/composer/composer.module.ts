import { Module } from "@nestjs/common";
import { ComposerService } from "./composer.service";
import { ComposerController } from "./composer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Composer } from "../../api-entity/Composer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Composer])],
  controllers: [ComposerController],
  providers: [ComposerService],
})
export class ComposerModule {}

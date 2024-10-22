import { Module } from "@nestjs/common";
import { ChangePasswordService } from "./change-password.service";
import { ChangePasswordController } from "./change-password.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChangePasswordEntity } from "./entities/change-password.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChangePasswordEntity])],
  controllers: [ChangePasswordController],
  providers: [ChangePasswordService],
})
export class ChangePasswordModule {}

import { Module } from "@nestjs/common";
import { ResetPasswordService } from "./reset-password.service";
import { ResetPasswordController } from "./reset-password.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResetPasswordEntity } from "./entities/reset-password.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ResetPasswordEntity])],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}

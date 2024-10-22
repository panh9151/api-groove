import { Module } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordController } from "./forgot-password.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResetTokenEntity } from "./entities/reset-token.entity";
import { User } from "src/api-entity/User.entity";

@Module({
  imports: [MailerModule, TypeOrmModule.forFeature([ResetTokenEntity, User])],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}

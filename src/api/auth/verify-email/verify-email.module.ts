import { Module } from "@nestjs/common";
import { VerifyEmailService } from "./verify-email.service";
import { VerifyEmailController } from "./verify-email.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VerifyEmailEntity } from "./entities/verify-email.entity";

@Module({
  imports: [MailerModule, TypeOrmModule.forFeature([VerifyEmailEntity])],
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService],
})
export class VerifyEmailModule {}

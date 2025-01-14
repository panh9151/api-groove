import { PaymentEntity } from "./../../../api-entity/Payment.entity";
import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../register/entities/register.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([PaymentEntity, UserEntity]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

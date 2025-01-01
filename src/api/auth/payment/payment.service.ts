import { PaymentEntity } from "./../../../api-entity/Payment.entity";
import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>
  ) {}

  async create(body: CreatePaymentDto, req: any) {
    const newPayment = this.paymentRepo.create({
      ...body,
      vip_code: req?.user?.vip_code,
    });
    const savedType = await this.paymentRepo.save(newPayment);

    return { newID: savedType.id_payment };
  }
}

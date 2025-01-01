import { PaymentEntity } from "./../../api-entity/Payment.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>
  ) {}

  async create(body: CreatePaymentDto) {
    const newPayment = this.paymentRepo.create(body);
    const savedType = await this.paymentRepo.save(newPayment);

    return { newID: savedType.id_payment };
  }

  async findAll() {
    const paymentList = await this.paymentRepo.find();

    return { data: paymentList };
  }

  async update(id: string, body: UpdatePaymentDto) {
    const existingPayment = await this.paymentRepo.findOne({
      where: { id_payment: id },
    });

    if (!existingPayment) {
      throw new NotFoundException(`Payment not found`);
    }

    Object.assign(existingPayment, body);
    await this.paymentRepo.save(existingPayment);

    return { success: "Updated successfully" };
  }
}

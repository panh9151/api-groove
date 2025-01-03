import { PaymentEntity } from "./../../../api-entity/Payment.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>
  ) {}

  async create(body: CreatePaymentDto, req: any) {
    const newPayment = this.paymentRepo.create({
      ...body,
      id_user: req?.user?.id_user,
      status: "pending",
    });
    const savedType = await this.paymentRepo.save(newPayment);

    return { newID: savedType.id_payment };
  }

  async update(id: string, body: UpdatePaymentDto, req) {
    const existingPayment = await this.paymentRepo.findOne({
      where: { id_payment: id, id_user: req?.user?.id_user },
    });

    if (!existingPayment) {
      throw new NotFoundException(`Payment not found`);
    }

    Object.assign(existingPayment, body);
    await this.paymentRepo.save(existingPayment);

    return { success: "Updated successfully" };
  }
}

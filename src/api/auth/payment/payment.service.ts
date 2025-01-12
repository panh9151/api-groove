import { PaymentEntity } from "./../../../api-entity/Payment.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { UserEntity } from "../register/entities/register.entity";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
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

  async update(id: string, body: UpdatePaymentDto, req: any) {
    const existingPayment = await this.paymentRepo.findOne({
      where: { id_payment: id, id_user: req?.user?.id_user },
    });

    if (!existingPayment) {
      throw new NotFoundException(`Payment not found`);
    }

    Object.assign(existingPayment, body);
    await this.paymentRepo.save(existingPayment);

    if (body?.status === "paid") {
      const user = await this.userRepo.findOne({
        where: { id_user: req?.user?.id_user },
      });
      Object.assign(user, { is_vip: 1 });
      await this.userRepo.save(user);
    }

    return { success: "Updated successfully" };
  }
}

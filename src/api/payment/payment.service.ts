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

  async create(body: CreatePaymentDto, req: any) {
    const newPayment = this.paymentRepo.create({
      ...body,
      id_user: req?.user?.id_user,
    });
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

  async getChart() {
    const allHistory = await this.paymentRepo
      .createQueryBuilder("payment")
      .andWhere("payment.created_at >= NOW() - INTERVAL 30 DAY")
      .andWhere("payment.created_at < NOW()")
      .getMany();

    const result = allHistory.reduce((acc, item) => {
      const day = new Date(item.created_at).toISOString().split("T")[0]; // Extract date part in YYYY-MM-DD format
      acc[day] = (acc[day] || 0) + (item?.status === "paid" && item?.amount);
      return acc;
    }, {});

    const formattedResult = Object.entries(result)
      .map(([day, revenue]) => ({ day, revenue }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()); // Simplified sorting

    return { data: formattedResult };
  }
}

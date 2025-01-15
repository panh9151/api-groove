import { PaymentEntity } from "./../../../api-entity/Payment.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { UserEntity } from "../register/entities/register.entity";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly mailerService: MailerService
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

    // Xử lý khi status là "paid"
    if (body?.status === "paid") {
      const user = await this.userRepo.findOne({
        where: { id_user: req?.user?.id_user },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const paymentTime = new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      await this.mailerService.sendMail({
        to: req?.user?.email,
        subject: "Groove - Xác nhận thanh toán gói VIP thành công",
        text: `Kính gửi ${req?.user?.fullname},
        
Chúc mừng bạn đã nâng cấp thành công gói VIP của Groove!

Chi tiết thanh toán:
- Gói thanh toán: 20.000 VND
- Thời gian thanh toán: ${paymentTime}
- Mã giao dịch: ${existingPayment?.id_payment}

Với gói VIP, bạn sẽ được tận hưởng nhiều tính năng cao cấp và độc quyền, giúp trải nghiệm âm nhạc của bạn thêm phong phú.

Nếu bạn có bất kỳ thắc mắc nào hoặc cần hỗ trợ, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi qua zalo: (+84) 794 437 748.

Cảm ơn bạn đã tin tưởng và đồng hành cùng Groove!

Trân trọng,
Đội ngũ Groove`,
      });

      user.is_vip = 1; // Trực tiếp gán thay vì Object.assign
      await this.userRepo.save(user);
    }

    return { success: "Updated successfully" };
  }
}

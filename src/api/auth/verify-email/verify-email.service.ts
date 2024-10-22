import { ConflictException, Injectable } from "@nestjs/common";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { VerifyEmailEntity } from "./entities/verify-email.entity";
import { Repository } from "typeorm";

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(VerifyEmailEntity)
    private readonly verifyEmailRepository: Repository<VerifyEmailEntity>
  ) {}

  async verifyEmail(body: VerifyEmailDto) {
    const { email } = body;
    // Check existing email
    const userList = await this.verifyEmailRepository.find({
      where: { email },
    });

    if (userList.length !== 0)
      throw new ConflictException("Email is already exist");

    // Send random code
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    await this.mailerService.sendMail({
      to: email,
      subject: `${randomCode} - Confirm Your Email Address`,
      text: `We have received your account registration request with this email address. To complete the registration process, please confirm your email address by entering the verification code. \n\nVerification code: ${randomCode}`,
    });

    return { message: "Verify code sended" };
  }
}

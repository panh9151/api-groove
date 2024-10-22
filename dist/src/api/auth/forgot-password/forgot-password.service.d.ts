import { MailerService } from "@nestjs-modules/mailer";
import { Repository } from "typeorm";
import { User } from "../../../../../src/api-entity/User.entity";
export declare class ForgotPasswordService {
  private readonly mailerService;
  private readonly userRepository;
  constructor(mailerService: MailerService, userRepository: Repository<User>);
  forgotPassword(
    email: string,
    req: any
  ): Promise<{
    message: string;
  }>;
}

import { VerifyEmailDto } from "./dto/verify-email.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyEmailEntity } from "./entities/verify-email.entity";
import { Repository } from "typeorm";
export declare class VerifyEmailService {
    private readonly mailerService;
    private readonly verifyEmailRepository;
    constructor(mailerService: MailerService, verifyEmailRepository: Repository<VerifyEmailEntity>);
    verifyEmail(body: VerifyEmailDto): Promise<{
        message: string;
    }>;
}

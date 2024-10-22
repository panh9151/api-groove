import { VerifyEmailService } from "./verify-email.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";
export declare class VerifyEmailController {
    private readonly verifyEmailService;
    constructor(verifyEmailService: VerifyEmailService);
    verifyEmail(body: VerifyEmailDto): Promise<{
        message: string;
    }>;
}

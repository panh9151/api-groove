import { ForgotPasswordService } from "./forgot-password.service";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
export declare class ForgotPasswordController {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordService);
    forgotPassword(body: ForgotPasswordDto, req: any): Promise<{
        message: string;
    }>;
}

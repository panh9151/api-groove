import { ResetPasswordService } from "./reset-password.service";
import { ResetPassworđto } from "./dto/reset-password.dto";
export declare class ResetPasswordController {
    private readonly resetPasswordService;
    constructor(resetPasswordService: ResetPasswordService);
    resetPasword(token: string, body: ResetPassworđto): Promise<{
        message: string;
    }>;
}

import { ResetPassworđto } from "./dto/reset-password.dto";
export declare class ResetPasswordService {
    private readonly resetPasswordRepository;
    resetPasword(body: ResetPassworđto, token: string): Promise<{
        message: string;
    }>;
}

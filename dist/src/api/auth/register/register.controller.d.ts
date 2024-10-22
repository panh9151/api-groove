import { RegisterService } from "./register.service";
import { RegisterDto } from "./dto/register.dto";
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    registerUser(body: RegisterDto): Promise<{
        id: string;
    }>;
}

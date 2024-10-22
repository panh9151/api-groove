import { RegisterDto } from "./dto/register.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/register.entity";
export declare class RegisterService {
    private readonly registerRepository;
    constructor(registerRepository: Repository<UserEntity>);
    registerUser(body: RegisterDto): Promise<{
        id: string;
    }>;
}

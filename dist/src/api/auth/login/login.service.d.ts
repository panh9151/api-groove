import { Repository } from "typeorm";
import { LoginEntity } from "./entities/login.entity";
export declare class LoginService {
    private readonly loginRepository;
    private readonly secretToken;
    constructor(loginRepository: Repository<LoginEntity>);
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}

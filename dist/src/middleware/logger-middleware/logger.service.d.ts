import { Repository } from "typeorm";
import { AuthUser } from "./entities/auth-user.entity";
export declare class AuthService {
    private readonly authUserRepository;
    constructor(authUserRepository: Repository<AuthUser>);
    findUser(id_user: string): Promise<AuthUser | null>;
}

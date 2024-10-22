import { NestMiddleware } from "@nestjs/common";
import { AuthUser } from "./entities/auth-user.entity";
import { Repository } from "typeorm";
export declare class LoggerMiddleware implements NestMiddleware {
    private authUserRepository;
    private readonly secretToken;
    constructor(authUserRepository: Repository<AuthUser>);
    use(req: any, res: any, next: () => void): Promise<void>;
}

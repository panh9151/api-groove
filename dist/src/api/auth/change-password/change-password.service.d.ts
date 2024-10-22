import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangePasswordEntity } from "./entities/change-password.entity";
import { Repository } from "typeorm";
export declare class ChangePasswordService {
    private readonly changePasswordEntity;
    constructor(changePasswordEntity: Repository<ChangePasswordEntity>);
    changePassword(req: any, body: ChangePasswordDto): Promise<{
        message: string;
    }>;
}

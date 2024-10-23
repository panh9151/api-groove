import { User } from "./../../api-entity/User.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(body: CreateUserDto): Promise<{
        newID: string;
    }>;
    findAll(limit: number, offset: number, id_user: string, email: string, role: string, fullname: string, phone: string, gender: string, birthday: string, country: string, is_banned: 0 | 1, id_google: string): Promise<{
        data: User[];
    }>;
    findOne(id: string): Promise<{
        data: User;
    }>;
    update(id: string, body: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

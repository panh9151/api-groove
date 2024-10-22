import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: CreateUserDto): Promise<{
        newID: string;
    }>;
    findAll(limit: string, offset: string, id_user: string, email: string, role: string, fullname: string, phone: string, gender: string, birthday: string, country: string, is_banned: 0 | 1, id_google: string): Promise<{
        data: import("../../api-entity/User.entity").User[];
    }>;
    findOne(id: string): Promise<{
        data: import("../../api-entity/User.entity").User;
    }>;
    update(id: string, body: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

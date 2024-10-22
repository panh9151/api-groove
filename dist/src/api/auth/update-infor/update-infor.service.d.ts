import { UpdateInforDto } from "./dto/update-infor.dto";
import { Repository } from "typeorm";
import { UpdateInforEntity } from "./entities/update-infor.entity";
export declare class UpdateInforService {
    private readonly updateInforRepository;
    constructor(updateInforRepository: Repository<UpdateInforEntity>);
    updateUser(id: string, body: UpdateInforDto): Promise<{
        message: string;
    }>;
}

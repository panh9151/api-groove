import { Type } from "./../../api-entity/Type.entity";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { Repository } from "typeorm";
export declare class TypeService {
    private readonly typeRepository;
    constructor(typeRepository: Repository<Type>);
    create(body: CreateTypeDto): Promise<{
        newID: string;
    }>;
    findAll(limit: string, offset: string, id_type: string, name: string, slug: string, is_show: 0 | 1, req: any): Promise<{
        data: Type[];
    }>;
    findOne(id: string, req: any): Promise<{
        data: Type;
    }>;
    update(id: string, body: UpdateTypeDto): Promise<{
        success: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

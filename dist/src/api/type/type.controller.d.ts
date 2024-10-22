import { TypeService } from "./type.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
export declare class TypeController {
    private readonly typeService;
    constructor(typeService: TypeService);
    create(body: CreateTypeDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, limit: string, offset: string, id_type: string, name: string, slug: string, is_show: 0 | 1): Promise<{
        data: import("../../api-entity/Type.entity").Type[];
    }>;
    findOne(req: any, id: string): Promise<{
        data: import("../../api-entity/Type.entity").Type;
    }>;
    update(id: string, body: UpdateTypeDto): Promise<{
        success: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

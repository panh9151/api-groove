import { UpdateInforService } from "./update-infor.service";
import { UpdateInforDto } from "./dto/update-infor.dto";
export declare class UpdateInforController {
    private readonly updateInforService;
    constructor(updateInforService: UpdateInforService);
    update(req: any, body: UpdateInforDto): Promise<{
        message: string;
    }>;
}

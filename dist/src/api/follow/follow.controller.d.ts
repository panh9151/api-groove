import { FollowService } from "./follow.service";
import { CreateFollowDto } from "./dto/create-follow.dto";
import { UpdateFollowDto } from "./dto/update-follow.dto";
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    createForUser(req: any, body: CreateFollowDto): Promise<{
        message: string;
    }>;
    getForArtist(limit: number, offset: number, id_artist: string): Promise<{
        data: any[];
    }>;
    getForUser(req: any): Promise<{
        data: any[];
    }>;
    removeForUser(req: any, body: UpdateFollowDto): Promise<{
        message: string;
    }>;
}

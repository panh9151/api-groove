import { CreateFollowDto } from "./dto/create-follow.dto";
import { UpdateFollowDto } from "./dto/update-follow.dto";
import { Follow } from "src/api-entity/Follow.entity";
import { Repository } from "typeorm";
import { Artist } from "src/api-entity/Artist.entity";
export declare class FollowService {
    private readonly followRepo;
    private readonly artistRepo;
    constructor(followRepo: Repository<Follow>, artistRepo: Repository<Artist>);
    create(body: CreateFollowDto, req: any): Promise<{
        message: string;
    }>;
    findByUser(req: any): Promise<{
        data: any[];
    }>;
    remove(body: UpdateFollowDto, req: any): Promise<{
        message: string;
    }>;
    findByArtist(limit: number, offset: number, id_artist: string): Promise<{
        data: any[];
    }>;
}

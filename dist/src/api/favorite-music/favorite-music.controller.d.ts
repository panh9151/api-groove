import { FavoriteMusicService } from "./favorite-music.service";
import { CreateFavoriteMusicDto } from "./dto/favorite-music.dto";
export declare class FavoriteMusicController {
    private readonly favoriteMusicService;
    constructor(favoriteMusicService: FavoriteMusicService);
    create(body: CreateFavoriteMusicDto, req: any): Promise<{
        message: string;
    }>;
    findAll(req: any, limit: string, offset: string): Promise<{
        data: any[];
    }>;
    delete(req: any, body: CreateFavoriteMusicDto): Promise<{
        message: string;
    }>;
}

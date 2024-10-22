import { CreateFavoriteMusicDto } from "./dto/favorite-music.dto";
import { Repository } from "typeorm";
import { Music } from "src/api-entity/Music.entity";
import { FavoriteMusic } from "src/api-entity/FavoriteMusic.entity";
export declare class FavoriteMusicService {
    private readonly musicRepo;
    private readonly favoriteRepo;
    constructor(musicRepo: Repository<Music>, favoriteRepo: Repository<FavoriteMusic>);
    create(body: CreateFavoriteMusicDto, req: any): Promise<{
        message: string;
    }>;
    findAll(limit: number, offset: number, req: any): Promise<{
        data: any[];
    }>;
    remove(req: any, body: CreateFavoriteMusicDto): Promise<{
        message: string;
    }>;
}

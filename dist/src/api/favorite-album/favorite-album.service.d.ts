import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
import { Album } from "src/api-entity/Album.entity";
import { Repository } from "typeorm";
import { FavoriteAlbumDetail } from "src/api-entity/FavoriteAlbumDetail.entity";
export declare class FavoriteAlbumService {
    private readonly albumRepo;
    private readonly favoriteRepo;
    constructor(albumRepo: Repository<Album>, favoriteRepo: Repository<FavoriteAlbumDetail>);
    create(body: CreateFavoriteAlbumDto, req: any): Promise<{
        message: string;
    }>;
    findAll(limit: number, offset: number, req: any): Promise<{
        data: any[];
    }>;
    remove(req: any, body: CreateFavoriteAlbumDto): Promise<{
        message: string;
    }>;
}

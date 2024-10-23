import { Album } from "./../../api-entity/Album.entity";
import { FavoriteAlbumDetail } from "./../../api-entity/FavoriteAlbumDetail.entity";
import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
import { Repository } from "typeorm";
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

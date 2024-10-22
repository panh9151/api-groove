import { FavoriteAlbumService } from "./favorite-album.service";
import { CreateFavoriteAlbumDto } from "./dto/favorite-album.dto";
export declare class FavoriteAlbumController {
    private readonly favoriteAlbumService;
    constructor(favoriteAlbumService: FavoriteAlbumService);
    create(body: CreateFavoriteAlbumDto, req: any): Promise<{
        message: string;
    }>;
    findAll(req: any, limit: string, offset: string): Promise<{
        data: any[];
    }>;
    delete(req: any, body: CreateFavoriteAlbumDto): Promise<{
        message: string;
    }>;
}

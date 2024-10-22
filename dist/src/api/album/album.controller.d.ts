import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(req: any, limit: string, offset: string, id_album: string, id_artist: string, name: string, slug: string, publish_by: string, is_show: 0 | 1): Promise<{
        data: any[];
    }>;
    findOne(id: string): Promise<{
        data: any;
    }>;
    create(createAlbumDto: CreateAlbumDto): Promise<{
        newID: string;
    }>;
    update(id: string, body: UpdateAlbumDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

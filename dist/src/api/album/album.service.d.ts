import { MusicAlbum } from "./../../api-entity/MusicAlbum.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Album } from "./../../api-entity/Album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { Repository } from "typeorm";
export declare class AlbumService {
    private readonly albumRepo;
    private readonly musicRepo;
    private readonly artistRepo;
    private readonly musicAlbumRepo;
    constructor(albumRepo: Repository<Album>, musicRepo: Repository<Music>, artistRepo: Repository<Artist>, musicAlbumRepo: Repository<MusicAlbum>);
    create(body: CreateAlbumDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, limit: number, offset: number, id_album: string, id_artist: string, name: string, slug: string, publish_by: string, is_show: 0 | 1): Promise<{
        data: any[];
    }>;
    findOne(id: string): Promise<{
        data: any;
    }>;
    update(id_album: string, body: UpdateAlbumDto): Promise<{
        message: string;
    }>;
    remove(id_album: string): Promise<{
        message: string;
    }>;
}

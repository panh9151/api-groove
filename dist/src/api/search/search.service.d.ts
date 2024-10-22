import { Repository } from "typeorm";
import { Artist } from "src/api-entity/Artist.entity";
import { Album } from "src/api-entity/Album.entity";
import { Music } from "src/api-entity/Music.entity";
export declare class SearchService {
    private readonly musicRepo;
    private readonly artistRepo;
    private readonly albumRepo;
    constructor(musicRepo: Repository<Music>, artistRepo: Repository<Artist>, albumRepo: Repository<Album>);
    findAll(req: any, search_text: string): Promise<{
        data: {
            musicList: any[];
            albumList: any[];
            artistList: Artist[];
        };
    }>;
}

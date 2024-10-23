import { Album } from "./../../api-entity/Album.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { Music } from "./../../api-entity/Music.entity";
import { Repository } from "typeorm";
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

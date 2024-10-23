import { Type } from "./../../api-entity/Type.entity";
import { Artist } from "./../../api-entity/Artist.entity";
import { MusicTypeDetail } from "./../../api-entity/MusicTypeDetail.entity";
import { MusicArtist } from "./../../api-entity/MusicArtist.entity";
import { Lyrics } from "./../../api-entity/Lyrics.entity";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { Repository } from "typeorm";
import { Music } from "../../api-entity/Music.entity";
export declare class MusicService {
    private readonly musicRepository;
    private readonly lyricsRepository;
    private readonly musicArtistRepo;
    private readonly musicTypeRepo;
    private readonly artistRepo;
    private readonly typeRepo;
    constructor(musicRepository: Repository<Music>, lyricsRepository: Repository<Lyrics>, musicArtistRepo: Repository<MusicArtist>, musicTypeRepo: Repository<MusicTypeDetail>, artistRepo: Repository<Artist>, typeRepo: Repository<Type>);
    create(body: CreateMusicDto): Promise<{
        newID: string;
    }>;
    findAll(limit: any, offset: any, id_music: any, name: any, slug: any, total_duration: any, producer: any, composer: any, is_show: any, id_type: any, id_artist: any, req: any): Promise<any[]>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, body: UpdateMusicDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { Repository } from "typeorm";
import { Music } from "../../api-entity/Music.entity";
import { Lyrics } from "src/api-entity/Lyrics.entity";
import { MusicTypeDetail } from "src/api-entity/MusicTypeDetail.entity";
import { MusicArtist } from "src/api-entity/MusicArtist.entity";
import { Artist } from "src/api-entity/Artist.entity";
import { Type } from "src/api-entity/Type.entity";
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

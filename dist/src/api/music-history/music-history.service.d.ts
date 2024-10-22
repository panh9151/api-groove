import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
import { MusicHistory } from "src/api-entity/MusicHistory.entity";
import { Repository } from "typeorm";
import { Music } from "src/api-entity/Music.entity";
export declare class MusicHistoryService {
    private readonly historyRepo;
    private readonly musicRepo;
    constructor(historyRepo: Repository<MusicHistory>, musicRepo: Repository<Music>);
    create(req: any, body: CreateMusicHistoryDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, limit: number, offset: number, id_music_history: string, id_music: string, play_duration: string): Promise<{
        data: MusicHistory[];
    }>;
}

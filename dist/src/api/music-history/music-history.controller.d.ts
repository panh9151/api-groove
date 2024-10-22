import { MusicHistoryService } from "./music-history.service";
import { CreateMusicHistoryDto } from "./dto/create-music-history.dto";
export declare class MusicHistoryController {
    private readonly musicHistoryService;
    constructor(musicHistoryService: MusicHistoryService);
    create(req: any, body: CreateMusicHistoryDto): Promise<{
        newID: string;
    }>;
    findAll(req: any, limit: string, offset: string, id_music_history: string, id_music: string, play_duration: string): Promise<{
        data: import("../../api-entity/MusicHistory.entity").MusicHistory[];
    }>;
}

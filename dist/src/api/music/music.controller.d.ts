import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    create(body: CreateMusicDto): Promise<{
        newID: string;
    }>;
    findAll(limit: string, offset: string, id_music: string, name: string, slug: string, total_duration: string, producer: string, composer: string, is_show: string, id_type: string, id_artist: string, req: any): Promise<any[]>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, updateMusicDto: UpdateMusicDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

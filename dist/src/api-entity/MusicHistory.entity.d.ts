import { User } from "./User.entity";
import { Music } from "./Music.entity";
export declare class MusicHistory {
    id_music_history: string;
    id_music: string;
    id_user: string;
    user: User;
    music: Music;
    play_duration: number;
    created_at: Date;
}

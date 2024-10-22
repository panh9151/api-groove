import { Music } from "./Music.entity";
export declare class Lyrics {
    id_lyrics: string;
    id_music: string;
    music: Music;
    lyrics: string;
    start_time: number;
    end_time: number;
}

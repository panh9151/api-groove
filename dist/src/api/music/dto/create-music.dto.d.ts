import { LyricsDto } from "./lyrics.dto";
export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class CreateMusicDto {
    name: string;
    slug: string;
    url_path: string;
    url_cover: string;
    total_duration: number;
    producer: string;
    composer: string;
    release_date: Date;
    is_show: 0 | 1;
    artists: any[];
    types: any[];
    lyrics: LyricsDto[];
}

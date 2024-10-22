import { Music } from "./Music.entity";
import { Playlist } from "./Playlist.entity";
export declare class MusicPlaylistDetail {
    id_playlist: string;
    id_music: string;
    index_order: number;
    playlist: Playlist;
    music: Music;
}

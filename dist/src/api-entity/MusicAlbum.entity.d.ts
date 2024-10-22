import { Music } from "./Music.entity";
import { Album } from "./Album.entity";
export declare class MusicAlbum {
    id_music: string;
    id_album: string;
    index_order: number;
    music: Music;
    album: Album;
}

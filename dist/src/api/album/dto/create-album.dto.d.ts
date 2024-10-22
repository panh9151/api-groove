import { MusicALbum } from "./music-album.dto";
export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class CreateAlbumDto {
    id_artist: string;
    name: any;
    slug: any;
    url_cover: any;
    release_date: any;
    publish_by: any;
    is_show: 0 | 1;
    musics: MusicALbum[];
}

import { Artist } from "./Artist.entity";
import { MusicAlbum } from "./MusicAlbum.entity";
export declare class Album {
    id_album: string;
    name: string;
    slug: string;
    url_cover: string;
    release_date: Date;
    publish_by: string;
    created_at: Date;
    last_update: Date;
    is_show: 0 | 1;
    id_artist: string;
    artist: Artist;
    musics: MusicAlbum[];
}

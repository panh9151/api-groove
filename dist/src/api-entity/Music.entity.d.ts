import { MusicTypeDetail } from "./MusicTypeDetail.entity";
import { MusicHistory } from "./MusicHistory.entity";
import { FavoriteMusic } from "./FavoriteMusic.entity";
import { MusicArtist } from "./MusicArtist.entity";
import { MusicAlbum } from "./MusicAlbum.entity";
import { Lyrics } from "./Lyrics.entity";
export declare class Music {
    id_music: string;
    name: string;
    slug: string;
    url_path: string;
    url_cover: string;
    total_duration: number;
    producer: string;
    composer: string;
    release_date: Date;
    created_at: Date;
    last_update: Date;
    is_show: 0 | 1;
    musicHistories: MusicHistory[];
    favoriteMusics: FavoriteMusic[];
    artists: MusicArtist[];
    types: MusicTypeDetail[];
    musicAlbumDetail: MusicAlbum[];
    lyrics: Lyrics[];
}

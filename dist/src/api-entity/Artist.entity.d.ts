import { Album } from "./Album.entity";
export declare class Artist {
    id_artist: string;
    name: string;
    slug: string;
    url_cover: string;
    created_at: Date;
    last_update: Date;
    is_show: boolean;
    albums: Album[];
}

export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class ArtistEntity {
    id_artist: string;
    name: string;
    slug: string;
    url_cover: Date;
    last_update: Date;
    created_at: Date;
    is_show: ShowStatus;
}

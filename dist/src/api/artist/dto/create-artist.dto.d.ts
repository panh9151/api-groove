export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class CreateArtistDto {
    id_artist: string;
    name: string;
    slug: string;
    url_cover: Date;
    is_show: ShowStatus;
}

export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class UpdateArtistDto {
    name: string;
    slug: string;
    url_cover: Date;
    is_show: ShowStatus;
}

export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class FindQueryDto {
    id_artist: string;
    slug: string;
    name: string;
    is_show: ShowStatus;
}

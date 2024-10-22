import { MusicTypeDetail } from "./MusicTypeDetail.entity";
export declare class Type {
    id_type: string;
    name: string;
    slug: string;
    created_at: Date;
    is_show: 0 | 1;
    music: MusicTypeDetail[];
}

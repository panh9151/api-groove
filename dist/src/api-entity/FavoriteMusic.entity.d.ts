import { User } from "./User.entity";
import { Music } from "./Music.entity";
export declare class FavoriteMusic {
    id_user: string;
    id_music: string;
    user: User;
    music: Music;
    last_update: Date;
}

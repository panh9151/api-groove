import { User } from "./User.entity";
export declare class Playlist {
    id_playlist: string;
    id_user: User;
    name: string;
    playlist_index: number;
    created_at: Date;
    last_update: Date;
}

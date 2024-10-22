import { User } from "./User.entity";
import { Artist } from "./Artist.entity";
export declare class Follow {
    id_user: string;
    id_artist: string;
    user: User;
    artist: Artist;
    created_at: Date;
}

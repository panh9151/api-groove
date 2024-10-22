import { User } from "./User.entity";
import { Album } from "./Album.entity";
export declare class FavoriteAlbumDetail {
    id_user: string;
    id_album: string;
    user: User;
    album: Album;
    last_update: Date;
}

import { User } from "./../../../api-entity/User.entity";
import { ArtistEntity } from "./artist.entity";
export declare enum ShowStatus {
    HIDDEN = 0,
    VISIBLE = 1
}
export declare class Follow {
    id_user: string;
    id_artist: string;
    artist: ArtistEntity;
    user: User;
}

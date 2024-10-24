import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Album } from "./Album.entity";

@Entity("FavoriteAlbum")
export class FavoriteAlbumDetail {
  @PrimaryColumn("uuid")
  id_user: string;

  @PrimaryColumn("uuid")
  id_album: string;

  @ManyToOne(() => User, (user) => user.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => Album, (album) => album.id_album, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_album" })
  album: Album;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  last_update: string;
}

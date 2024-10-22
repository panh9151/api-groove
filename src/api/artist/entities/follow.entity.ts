import { User } from "./../../../api-entity/User.entity";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { ArtistEntity } from "./artist.entity";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

@Entity("Follow")
export class Follow {
  @PrimaryColumn()
  id_user: string;

  @PrimaryColumn()
  id_artist: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id_artist, {
    onDelete: "CASCADE",
  })
  artist: ArtistEntity;

  @ManyToOne(() => User, (user) => user.id_user, { onDelete: "CASCADE" })
  user: User;
}

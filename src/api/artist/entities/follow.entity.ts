import { User } from "./../../../api-entity/User.entity";
import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
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

  @Column()
  created_at: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id_artist)
  @JoinColumn({ name: "id_artist" })
  artist: ArtistEntity;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn({ name: "id_user" })
  user: User;
}

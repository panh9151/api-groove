import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Artist } from "./Artist.entity";

@Entity("Follow")
export class Follow {
  @PrimaryColumn("uuid")
  id_user: string;

  @PrimaryColumn("uuid")
  id_artist: string;

  @ManyToOne(() => User, (user) => user.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => Artist, (artist) => artist.id_artist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_artist" })
  artist: Artist;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}

import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Music } from "./Music.entity";

@Entity("FavoriteMusic")
export class FavoriteMusic {
  @PrimaryColumn("uuid")
  id_user: string;

  @PrimaryColumn("uuid")
  id_music: string;

  @ManyToOne(() => User, (user) => user.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => Music, (music) => music.id_music, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_music" })
  music: Music;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  last_update: string;
}

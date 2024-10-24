import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Music } from "./Music.entity";

@Entity("MusicHistory")
export class MusicHistory {
  @PrimaryGeneratedColumn("uuid")
  id_music_history: string;

  @Column()
  id_music: string;

  @Column()
  id_user: string;

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

  @Column({ type: "int", nullable: true })
  play_duration: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Music } from "./Music.entity";
import { User } from "./User.entity";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id_comment: string;

  @Column()
  id_music: string;

  @Column()
  id_user: string;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne(() => Music, (music) => music.id_music)
  @JoinColumn({ name: "id_music" })
  music: Music;

  @Column()
  text: string;

  @Column()
  is_show: 0 | 1;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;
}

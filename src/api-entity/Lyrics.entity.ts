import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Music } from "./Music.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("Lyrics")
export class Lyrics {
  @PrimaryGeneratedColumn("uuid")
  id_lyrics: string = uuidv4();

  @Column()
  id_music: string;

  @ManyToOne(() => Music, (music) => music.id_music, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_music" })
  music: Music;

  @Column({ type: "text", nullable: true })
  lyrics: string;

  @Column({ type: "int" })
  start_time: number;

  @Column({ type: "int" })
  end_time: number;
}

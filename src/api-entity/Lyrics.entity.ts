import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Lyrics")
export class Lyrics {
  @PrimaryGeneratedColumn("uuid")
  id_lyrics: string;

  @Column()
  id_music: string;

  @Column()
  start_time: number;

  @Column()
  end_time: number;

  @Column()
  lyrics: string;
}

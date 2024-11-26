import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Music } from "./Music.entity";

@Entity("Composer")
export class Composer {
  @PrimaryGeneratedColumn("uuid")
  id_composer: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: string;

  @OneToMany(() => Music, (music) => music.id_composer)
  musics: Music[];
}

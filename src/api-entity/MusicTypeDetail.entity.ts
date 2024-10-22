import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Music } from "./Music.entity";
import { Type } from "./Type.entity";

@Entity("MusicTypeDetail")
export class MusicTypeDetail {
  @PrimaryColumn()
  id_music: string;

  @PrimaryColumn()
  id_type: string;

  @ManyToOne(() => Music, (music) => music.types)
  @JoinColumn({ name: "id_music" })
  music: Music;

  @ManyToOne(() => Type, (type) => type.music)
  @JoinColumn({ name: "id_type" })
  type: Type;
}

import { Entity, ManyToOne, PrimaryColumn, Column } from "typeorm";
import { Music } from "./Music.entity";
import { Playlist } from "./Playlist.entity";

@Entity("MusicPlaylistDetail")
export class MusicPlaylistDetail {
  @PrimaryColumn("uuid")
  id_playlist: string;

  @PrimaryColumn("uuid")
  id_music: string;

  @Column({ type: "int", default: 0 })
  index_order: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.id_playlist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  playlist: Playlist;

  @ManyToOne(() => Music, (music) => music.id_music, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  music: Music;
}

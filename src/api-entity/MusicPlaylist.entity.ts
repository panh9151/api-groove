import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from "typeorm";
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

  @ManyToOne(() => Playlist, (playlist) => playlist.musics)
  @JoinColumn({ name: "id_playlist" })
  playlist: Playlist;

  @ManyToOne(() => Music, (music) => music.id_music)
  @JoinColumn({ name: "id_music" })
  music: Music;
}

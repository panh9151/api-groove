import { Entity, ManyToOne, PrimaryColumn, Column, JoinColumn } from "typeorm";
import { Music } from "./Music.entity";
import { Album } from "./Album.entity";

@Entity("MusicAlbumDetail")
export class MusicAlbum {
  @PrimaryColumn("uuid")
  id_music: string;

  @PrimaryColumn("uuid")
  id_album: string;

  @Column({ type: "int", default: 0 })
  index_order: number;

  @ManyToOne(() => Music, (music) => music.musicAlbumDetail, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_music" })
  music: Music;

  @ManyToOne(() => Album, (album) => album.musics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_album" })
  album: Album;
}

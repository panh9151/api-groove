import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Music } from "./Music.entity";
import { Artist } from "./Artist.entity";

@Entity("MusicArtistDetail")
export class MusicArtist {
  @PrimaryColumn("uuid")
  id_artist: string;

  @PrimaryColumn("uuid")
  id_music: string;

  @ManyToOne(() => Artist, (artist) => artist.id_artist, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_artist" })
  artist: Artist;

  @ManyToOne(() => Music, (music) => music.id_music, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_music" })
  music: Music;
}

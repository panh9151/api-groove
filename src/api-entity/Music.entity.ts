import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { MusicTypeDetail } from "./MusicTypeDetail.entity";
import { MusicHistory } from "./MusicHistory.entity";
import { FavoriteMusic } from "./FavoriteMusic.entity";
import { MusicArtist } from "./MusicArtist.entity";
import { v4 as uuidv4 } from "uuid";
import { Album } from "./Album.entity";
import { MusicAlbum } from "./MusicAlbum.entity";
import { Lyrics } from "./Lyrics.entity";
import { MusicPlaylistDetail } from "./MusicPlaylist.entity";

@Entity("Music")
export class Music {
  @PrimaryGeneratedColumn("uuid")
  id_music: string = uuidv4();

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  slug: string;

  @Column({ type: "varchar", length: 255 })
  url_path: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url_cover: string;

  @Column({ type: "int", default: 0 })
  total_duration: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  producer: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  composer: string;

  @Column({ type: "date", nullable: true })
  release_date: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: string;

  @Column({ type: "tinyint", default: 1 })
  is_show: 0 | 1;

  // Relations
  @OneToMany(() => MusicHistory, (musicHistory) => musicHistory.music)
  musicHistories: MusicHistory[];

  @OneToMany(() => FavoriteMusic, (favoriteMusic) => favoriteMusic.music)
  favoriteMusics: FavoriteMusic[];

  @OneToMany(() => MusicArtist, (musicArtistDetail) => musicArtistDetail.music)
  artists: MusicArtist[];

  @OneToMany(() => MusicTypeDetail, (musicTypeDetail) => musicTypeDetail.music)
  types: MusicTypeDetail[];

  @OneToMany(() => MusicAlbum, (musicAlbum) => musicAlbum.music)
  musicAlbumDetail: MusicAlbum[];

  @OneToMany(() => Lyrics, (lyrics) => lyrics.music)
  lyrics: Lyrics[];

  // @OneToMany(() => MusicPlaylistDetail, (mpd) => mpd.music)
  // playlists: MusicPlaylistDetail[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MusicTypeDetail } from "./MusicTypeDetail.entity";
import { MusicHistory } from "./MusicHistory.entity";
import { FavoriteMusic } from "./FavoriteMusic.entity";
import { MusicArtist } from "./MusicArtist.entity";
import { v4 as uuidv4 } from "uuid";
import { MusicAlbum } from "./MusicAlbum.entity";
import { Composer } from "./Composer.entity";

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

  @Column({ type: "varchar", length: 255, nullable: true })
  producer: string;

  @Column({ type: "date", nullable: true })
  release_date: Date;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: string;

  @Column({ type: "tinyint", default: 1 })
  is_show: 0 | 1;

  @Column()
  composer: string;

  // Relations
  @ManyToOne(() => Composer, (composer) => composer.musics)
  @JoinColumn({ name: "composer" })
  id_composer: Composer;

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

  // @OneToMany(() => MusicPlaylistDetail, (mpd) => mpd.music)
  // playlists: MusicPlaylistDetail[];
}

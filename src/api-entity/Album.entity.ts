import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Artist } from "./Artist.entity";
import { MusicAlbum } from "./MusicAlbum.entity";

@Entity("Album")
export class Album {
  @PrimaryGeneratedColumn("uuid")
  id_album: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  slug: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url_cover: string;

  @Column({ type: "date", nullable: true })
  release_date: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  publish_by: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: Date;

  @Column({ type: "tinyint", default: 1 })
  is_show: 0 | 1;

  @Column()
  id_artist: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "id_artist" })
  artist: Artist;

  @OneToMany(() => MusicAlbum, (musicAlbum) => musicAlbum.album)
  musics: MusicAlbum[];
}

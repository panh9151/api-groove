import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Album } from "./Album.entity";

@Entity("Artist")
export class Artist {
  @PrimaryGeneratedColumn("uuid")
  id_artist: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  slug: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  url_cover: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: Date;

  @Column({ type: "tinyint", default: 1 })
  is_show: boolean;

  // Mối quan hệ OneToMany giữa Artist và Album
  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}

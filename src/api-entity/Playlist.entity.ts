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
import { User } from "./User.entity";
import { MusicPlaylistDetail } from "./MusicPlaylist.entity";

@Entity("Playlist")
export class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id_playlist: string;

  @ManyToOne(() => User, (user) => user.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "id_user" })
  id_user: User;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int", default: 0 })
  playlist_index: number;

  @CreateDateColumn({ type: "datetime" })
  created_at: string;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: string;

  @OneToMany(
    () => MusicPlaylistDetail,
    (musicPlaylistDetail) => musicPlaylistDetail.playlist
  )
  musics: MusicPlaylistDetail[];
}

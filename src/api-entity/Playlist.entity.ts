import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";

@Entity("Playlist")
export class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id_playlist: string;

  @ManyToOne(() => User, (user) => user.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: true,
  })
  id_user: User;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int", default: 0 })
  playlist_index: number;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: Date;
}

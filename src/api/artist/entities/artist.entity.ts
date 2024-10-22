import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Follow } from "./follow.entity";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

@Entity("Artist")
export class ArtistEntity {
  @PrimaryGeneratedColumn("uuid")
  id_artist: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  url_cover: Date;

  @Column()
  last_update: Date;

  @Column()
  created_at: Date;

  @Column({ type: "enum", enum: ShowStatus, default: ShowStatus.VISIBLE })
  is_show: ShowStatus;
}

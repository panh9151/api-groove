import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { MusicTypeDetail } from "./MusicTypeDetail.entity";

@Entity("Type")
@Unique(["slug"])
export class Type {
  @PrimaryGeneratedColumn("uuid")
  id_type: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  slug: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @Column({ type: "tinyint", default: 1 })
  is_show: 0 | 1;

  @OneToMany(() => MusicTypeDetail, (musicTypeDetail) => musicTypeDetail.type)
  music: MusicTypeDetail[];
}

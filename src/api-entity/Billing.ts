import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Bill")
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  id_bill: string;

  @Column()
  id_music: string;

  @Column()
  update_at: string;

  @Column()
  created_at: string;
}

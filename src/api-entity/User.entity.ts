import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role: "user" | "admin";

  @Column({ type: "varchar", length: 255 })
  fullname: string;

  @Column({ type: "varchar", length: 12, unique: true, nullable: true })
  phone: string;

  @Column({ type: "enum", enum: ["male", "female"], nullable: true })
  gender: "male" | "female";

  @Column({ type: "varchar", length: 255, nullable: true })
  url_avatar: string;

  @Column({ type: "date", nullable: true })
  birthday: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  country: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", onUpdate: "CURRENT_TIMESTAMP" })
  last_update: Date;

  @Column({ type: "tinyint", default: 0 })
  is_banned: 0 | 1;

  @Column({ type: "varchar", length: 255, nullable: true })
  id_google: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  reset_token: string;

  @Column({ type: "bigint", nullable: true })
  reset_token_expired: number;
}

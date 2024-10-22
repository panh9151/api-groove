import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

@Entity("User")
export class LoginEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: "user" | "admin";

  @Column()
  is_banned: 0 | 1;
}

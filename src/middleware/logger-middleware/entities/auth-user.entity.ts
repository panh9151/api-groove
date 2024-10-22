import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class AuthUser {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  gender: "male" | "female";

  @Column()
  url_avatar: string;

  @Column()
  birthday: Date;

  @Column()
  country: string;

  @Column()
  created_at: Date;

  @Column()
  last_update: Date;

  @Column()
  is_banned: 0 | 1;

  @Column()
  id_google: string;

  @Column()
  reset_token: string;

  @Column()
  reset_token_expired: string;
}

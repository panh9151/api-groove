import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum ShowStatus {
  HIDDEN = 0,
  VISIBLE = 1,
}

@Entity("User")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  url_avatar: string;

  @Column()
  birthday: string;

  @Column()
  country: string;

  @Column()
  created_at: string;

  @Column()
  last_update: string;

  @Column()
  id_google: string;

  @Column()
  is_vip: string;

  @Column()
  vip_code: string;
}

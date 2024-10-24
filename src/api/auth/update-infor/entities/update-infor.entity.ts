import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

enum Status {
  BANNED = 1,
  ACTIVE = 0,
}

@Entity("User")
export class UpdateInforEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  fullname: string;

  @Column()
  url_avatar: string;

  @Column()
  phone: string;

  @Column()
  gender: Gender;

  @Column()
  birthday: string;

  @Column()
  country: string;

  @Column()
  is_banned: Status;
}

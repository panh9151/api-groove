import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

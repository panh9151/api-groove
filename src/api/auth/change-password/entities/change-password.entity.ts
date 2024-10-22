import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class ChangePasswordEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  password: string;
}

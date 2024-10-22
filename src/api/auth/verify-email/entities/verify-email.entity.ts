import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class VerifyEmailEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  email: string;
}

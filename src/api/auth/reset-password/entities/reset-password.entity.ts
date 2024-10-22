import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class ResetPasswordEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  password: string;

  @Column()
  reset_token: string;

  @Column()
  reset_token_expired: number;
}

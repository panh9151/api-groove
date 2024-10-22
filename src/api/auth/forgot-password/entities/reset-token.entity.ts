import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class ResetTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  email: string;

  @Column()
  reset_token: string;

  @Column()
  reset_token_expired: number;
}

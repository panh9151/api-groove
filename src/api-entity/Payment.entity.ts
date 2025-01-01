import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Payment")
export class PaymentEntity {
  @PrimaryGeneratedColumn("uuid")
  id_payment: string;

  @Column()
  vip_code: string;

  @Column()
  method: string;

  @Column()
  amount: number;

  @Column()
  created_at: string;

  @Column()
  last_update: string;

  @Column()
  status: string;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Table } from "./Table";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: string;

  @Column()
  email: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @ManyToOne(() => Table) // Optional relation if we want foreign key constraint
  table: Table;

  @Column()
  tableNumber: string; // Keep simple column for now

  @Column()
  status: string; // 'pending' | 'confirmed' | 'cancelled'
}

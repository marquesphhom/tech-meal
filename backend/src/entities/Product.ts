import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { TechnicalSheet } from "./TechnicalSheet";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal", { precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column()
  category: string;

  @OneToOne(() => TechnicalSheet, (sheet) => sheet.product, { nullable: true })
  technicalSheet: TechnicalSheet;
}

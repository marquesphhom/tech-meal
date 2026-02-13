import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { TechnicalSheetItem } from "./TechnicalSheetItem";

@Entity()
export class TechnicalSheet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  observations: string;

  @OneToOne(() => Product, (product) => product.technicalSheet, { nullable: true })
  @JoinColumn()
  product: Product;

  @Column({ nullable: true })
  productId: string;

  @OneToMany(() => TechnicalSheetItem, (item) => item.technicalSheet, { cascade: true })
  items: TechnicalSheetItem[];
}

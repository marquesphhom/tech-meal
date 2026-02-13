import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TechnicalSheet } from "./TechnicalSheet";
import { Ingredient } from "./Ingredient";

@Entity()
export class TechnicalSheetItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => TechnicalSheet, (sheet) => sheet.items, { onDelete: "CASCADE" })
  technicalSheet: TechnicalSheet;

  @ManyToOne(() => Ingredient, { onDelete: "CASCADE" })
  ingredient: Ingredient;

  @Column("decimal", { precision: 10, scale: 2 })
  quantity: number;
}

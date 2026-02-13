import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TechnicalSheet } from "./TechnicalSheet";
import { Ingredient } from "./Ingredient";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";

@Entity('technical_sheet_items')
export class TechnicalSheetItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => TechnicalSheet, (sheet) => sheet.items, { onDelete: "CASCADE" })
  technicalSheet: TechnicalSheet;

  @ManyToOne(() => Ingredient, { onDelete: "CASCADE" })
  ingredient: Ingredient;

  @Column("decimal", { precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  quantity: number;
}

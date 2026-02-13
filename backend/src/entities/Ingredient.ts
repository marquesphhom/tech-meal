import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  unit: string;

  @Column("decimal", { precision: 10, scale: 2, transformer: new ColumnNumericTransformer() })
  cost: number;

  @Column()
  groupLevel1: string;

  @Column()
  groupLevel2: string;

  @Column()
  groupLevel3: string;
}

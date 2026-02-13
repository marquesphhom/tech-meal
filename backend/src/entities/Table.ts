import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Table {
  @PrimaryColumn() // Use number as string as PK? Or just number? Types say 'string'. Let's use string "number" as PK or separate ID.
  number: string;

  @Column()
  capacity: number;

  @Column()
  isAvailable: boolean;
}

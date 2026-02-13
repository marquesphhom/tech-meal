import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { TechnicalSheet } from "./entities/TechnicalSheet";
import { TechnicalSheetItem } from "./entities/TechnicalSheetItem";
import { Ingredient } from "./entities/Ingredient";
import { Table } from "./entities/Table";
import { Reservation } from "./entities/Reservation";
import { User } from "./entities/User";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/techmeal",
    synchronize: true,
    logging: false,
    entities: [Product, TechnicalSheet, TechnicalSheetItem, Ingredient, Table, Reservation, User],
    migrations: [],
    subscribers: [],
});

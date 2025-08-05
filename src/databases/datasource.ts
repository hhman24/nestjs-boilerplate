import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "../utils/name-strategy.util";

dotenv.config();

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["src/modules/**/*.entity{.ts,.js}", "src/modules/**/*.view-entity{.ts,.js}"],
    migrations: ["src/databases/migrations/*{.ts,.js}"]
});

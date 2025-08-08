import dotenv from "dotenv";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "../utils/name-strategy.util";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.MY_SQL_HOST,
    port: Number(process.env.MY_SQL_PORT),
    username: process.env.MY_SQL_USERNAME,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DB_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["src/modules/**/*.entity{.ts,.js}", __dirname + "src/modules/**/*.view-entity{.ts,.js}"],
    migrations: ["src/databases/migrations/**/*{.ts,.js}"],
    poolSize: process.env.DATABASE_MAX_CONNECTIONS ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) : 100,
    ssl:
        process.env.DATABASE_SSL_ENABLED === "true"
            ? {
                  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === "true",
                  ca: process.env.DATABASE_CA ?? undefined,
                  key: process.env.DATABASE_KEY ?? undefined,
                  cert: process.env.DATABASE_CERT ?? undefined
              }
            : undefined,
    seeds: ["src/databases/seeds/**/*{.ts,.js}"],
    seedTracking: true,
    factories: ["src/databases/factories/**/*{.ts,.js}"]
} as DataSourceOptions & SeederOptions);

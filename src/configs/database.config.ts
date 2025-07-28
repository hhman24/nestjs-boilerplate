import { IDatabaseConfig } from "@common";
import { ConfigKeyEnum } from "@enums";
import { registerAs } from "@nestjs/config";
import path from "path";

export const MySqlConfig = registerAs(ConfigKeyEnum.MY_SQL, (): IDatabaseConfig => {
    // const sslEnabled = process.env.MY_SQL_SSL === "true";
    // const rejectUnauthorized = process.env.MY_SQL_REJECT_UNAUTHORIZED === "true";

    return {
        type: "mysql",
        host: process.env.MY_SQL_HOST || "localhost",
        port: Number(process.env.MY_SQL_PORT || 3306),
        username: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_HOST,
        database: process.env.MY_SQL_DB_NAME,
        synchronize: process.env.MY_SQL_SYNC === "true",
        dropSchema: true,
        logging: process.env.MY_SQL_LOGGING === "true" ? ["error", "warn", "query"] : ["error", "warn"],
        logger: "advanced-console",
        entities: [path.join(__dirname, "..", "modules", "**", "entities", "*.entity.{ts,js}")]
        // migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
        // migrationsTableName: "migrations",
        // poolSize: Number(process.env.MY_SQL_MAX_CONNECTIONS || 10),
        // ssl: sslEnabled
        //     ? {
        //           rejectUnauthorized,
        //           ca: process.env.MY_SQL_SSL_CA || undefined,
        //           key: process.env.MY_SQL_SSL_KEY || undefined,
        //           cert: process.env.MY_SQL_SSL_CERT || undefined
        //       }
        //     : undefined
    };
});

import { IDatabaseConfig } from "@common";
import { ConfigKeyEnum } from "@enums";
import { registerAs } from "@nestjs/config";

export const MySqlConfig = registerAs(
    ConfigKeyEnum.MY_SQL,
    (): IDatabaseConfig => ({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        uri: process.env.DATABASE_URI
    })
);

export const DatabaseConfig = registerAs(
    ConfigKeyEnum.DB,
    (): IDatabaseConfig => ({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        uri: process.env.DATABASE_URI
    })
);

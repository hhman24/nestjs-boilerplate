import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export type IDatabaseConfig = TypeOrmModuleOptions;

export interface IAppConfig {
    nodeEnv: string;
    port: number;
    serviceName: string;
    apiPrefix: string;
    origins: string[];
    logDir: string;
    isProduction: boolean;
    apiTimeout: number;
    throttleTTL: number;
    throttleLimit: number;
}

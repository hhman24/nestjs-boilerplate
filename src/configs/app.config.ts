import { IAppConfig } from "@common";
import { ConfigKeyEnum, EnvironmentEnum } from "@enums";
import { registerAs } from "@nestjs/config";

export const AppConfig = registerAs(
    ConfigKeyEnum.APP,
    (): IAppConfig => ({
        nodeEnv: process.env.NODE_ENV,
        port: Number(process.env.PORT),
        serviceName: process.env.SERVICE_NAME,
        apiPrefix: process.env.API_PREFIX,
        origins: process.env.ALLOW_ORIGINS.split(","),
        logDir: process.env.LOG_DIR,
        isProduction: process.env.NODE_ENV === EnvironmentEnum.PRODUCTION,
        apiTimeout: Number(process.env.API_TIMEOUT),
        throttleTTL: Number(process.env.THROTTLE_TTL),
        throttleLimit: Number(process.env.THROTTLE_LIMIT)
    })
);

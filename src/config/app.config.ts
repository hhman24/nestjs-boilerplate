import { ConfigKey, Environment } from "@common/enums";
import { IAppConfig } from "@common/interfaces";
import { registerAs } from "@nestjs/config";

export const AppConfig = registerAs(
    ConfigKey.APP,
    (): IAppConfig => ({
        nodeEnv: process.env.NODE_ENV,
        port: Number(process.env.PORT),
        serviceName: process.env.SERVICE_NAME,
        apiPrefix: process.env.API_PREFIX,
        origins: process.env.ALLOW_ORIGINS.split(","),
        logDir: process.env.LOG_DIR,
        isProduction: process.env.NODE_ENV === Environment.PRODUCTION
    })
);

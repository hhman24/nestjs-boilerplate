import { ConfigKey } from "@common/enums";
import { registerAs } from "@nestjs/config";

export const AppConfig = registerAs(ConfigKey.APP, () => ({
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    serviceName: process.env.SERVICE_NAME
}));

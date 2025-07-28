import { EnvironmentEnum } from "@enums";
import Joi from "joi";

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(EnvironmentEnum.DEVELOPMENT, EnvironmentEnum.PRODUCTION, EnvironmentEnum.TESTING).required(),
    SERVICE_NAME: Joi.string().required(),
    PORT: Joi.number().port().required(),
    API_PREFIX: Joi.string().default("api"),
    API_TIMEOUT: Joi.number().required(),

    THROTTLE_TTL: Joi.number().required(),
    THROTTLE_LIMIT: Joi.number().required(),

    LOG_DIR: Joi.string().default("logs"),
    LOG_LEVEL: Joi.string().default("debug"),

    ALLOW_ORIGINS: Joi.string().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().options({ convert: true }).default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required()
});

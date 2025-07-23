import { Environment } from "@common/enums";
import Joi from "joi";

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(Environment.DEVELOPMENT, Environment.PRODUCTION, Environment.TESTING).required(),
    SERVICE_NAME: Joi.string().required(),
    PORT: Joi.number().port().required(),
    API_PREFIX: Joi.string().default("api"),

    LOG_DIR: Joi.string().default("logs"),
    LOG_LEVEL: Joi.string().default("debug"),

    ALLOW_ORIGINS: Joi.string().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required()
});

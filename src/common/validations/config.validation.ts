import { Environment } from "@common/enums";
import Joi from "joi";

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(Environment.DEVELOPMENT, Environment.PRODUCTION, Environment.TESTING).required(),
    SERVICE_NAME: Joi.string().required(),
    PORT: Joi.number().port().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required()
});

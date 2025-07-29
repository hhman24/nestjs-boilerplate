import { AppConfig } from "./app.config";
import { MySqlConfig } from "./database.config";

export * from "./swagger.config";

export const configurations = [AppConfig, MySqlConfig];

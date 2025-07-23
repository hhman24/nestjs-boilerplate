import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { LoggerModuleAsyncOptions } from "./interfaces";
import { WinstonLoggerService } from "./winston-logger.service";
import { WinstonFactory } from "./winston.factory";

export const LOGGER_OPTIONS = "LOGGER_OPTIONS";

@Module({})
export class LoggerModule {
    static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
        const providers = [];
        const imports = options.imports || [];
        const exports = [];

        if (options.engine === "winston") {
            imports.push(
                WinstonModule.forRootAsync({
                    imports: options.imports || [],
                    inject: options.inject || [],
                    useFactory: async (...args) => {
                        const loggerOptions = await options.useFactory(...args);

                        const factory = new WinstonFactory();
                        return factory.createWinstonModuleOptions(loggerOptions);
                    }
                })
            );
            providers.push(WinstonLoggerService);
            exports.push(WinstonLoggerService);
        } else {
            throw new Error(`Unsupported logger engine: ${options.engine}`);
        }

        return {
            module: LoggerModule,
            global: options.isGlobal ?? false,
            imports,
            providers,
            exports
        };
    }
}

import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { IDynamicLoggerOptions } from "./interfaces";
import { WinstonFactory } from "./winston.factory";

@Module({})
export class LoggerModule {
    static forRootAsync(options: IDynamicLoggerOptions): DynamicModule {
        return {
            module: LoggerModule,
            imports: [WinstonModule.forRootAsync({
                useFactory: () => {
                    return WinstonFactory.
                }
            })],
            exports: [WinstonModule]
        };
    }
}

import { DynamicModule, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { IDynamicLoggerOptions } from "./interfaces";
import { WinstonFactory } from "./winston.factory";

@Module({})
export class LoggerModule {
    static forRootAsync(options: IDynamicLoggerOptions & { isGlobal?: boolean }): DynamicModule {
        return {
            module: LoggerModule,
            global: options.isGlobal ?? false,
            imports: [
                WinstonModule.forRootAsync({
                    useFactory: () => {
                        const winstonFactory = new WinstonFactory();
                        return winstonFactory.createWinstonModuleOptions(options);
                    }
                })
            ],
            exports: [WinstonModule]
        };
    }
}

import { IAppConfig } from "@common";
import { ConfigKeyEnum, EnvironmentEnum } from "@enums";
import LoggerService from "@modules/logger/application/logger.service";
import ILoggerService, { LOGGER_BASE_KEY, LOGGER_KEY } from "@modules/logger/domain/logger-service.interface";
import { Global, Inject, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import morgan from "morgan";
import { ConsoleTransport, FileTransport } from "../winston/transports";
import WinstonLogger, { WINSTON_LOGGER_TRANSPORT_KEYS } from "../winston/winston-logger";
import LoggerServiceAdapter from "./logger-sevice.adapter";

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: LOGGER_BASE_KEY,
            useClass: WinstonLogger
        },
        {
            provide: LOGGER_KEY,
            useClass: LoggerService
        },
        {
            inject: [LOGGER_KEY],
            provide: LoggerServiceAdapter,
            useFactory: (loggerService: ILoggerService) => new LoggerServiceAdapter(loggerService)
        },
        {
            inject: [ConfigService],
            provide: WINSTON_LOGGER_TRANSPORT_KEYS,
            useFactory: (configService: ConfigService) => {
                const transports = [];
                transports.push(ConsoleTransport.createColorize());
                transports.push(FileTransport.create(configService.get("LOG_DIR")));

                // config webhook
                if (configService.get<IAppConfig>(`${ConfigKeyEnum.APP}`).isProduction) {
                    // if (configService.slackWebhookUrl) {
                    //     transports.push(SlackTransport.create(configService.slackWebhookUrl));
                    // }
                }

                return transports;
            }
        }
    ],
    exports: [LOGGER_KEY, LoggerServiceAdapter]
})
export class LoggerModule implements NestModule {
    public constructor(
        @Inject(LOGGER_KEY) private logger: ILoggerService,
        private configService: ConfigService
    ) {}

    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                morgan(this.configService.get("NODE_ENV") === EnvironmentEnum.PRODUCTION ? "combined" : "dev", {
                    stream: {
                        write: (message: string) => {
                            this.logger.debug(message, {
                                sourceClass: "RequestLogger"
                            });
                        }
                    }
                })
            )
            .forRoutes("*");
    }
}

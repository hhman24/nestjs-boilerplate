import { LogData, LogLevel } from "@modules/logger/domain/log.interface";
import ILoggerService from "@modules/logger/domain/logger-service.interface";
import { Inject, Injectable } from "@nestjs/common";
import winston from "winston";

export const WINSTON_LOGGER_TRANSPORT_KEYS = Symbol();

@Injectable()
export default class WinstonLogger implements ILoggerService {
    private logger: winston.Logger;

    public constructor(@Inject(WINSTON_LOGGER_TRANSPORT_KEYS) transports: winston.transport[]) {
        // Create winston logger
        this.logger = winston.createLogger(this.getLoggerFormatOptions(transports));
    }

    private getLoggerFormatOptions(transports: winston.transport[]) {
        // Setting log levels for winston
        const levels: any = {};
        let cont = 0;
        Object.values(LogLevel).forEach((level) => {
            levels[level] = cont;
            cont++;
        });

        return {
            level: LogLevel.Debug,
            levels: levels,
            format: winston.format.combine(
                // Add timestamp and format the date
                winston.format.timestamp({
                    format: "DD/MM/YYYY, HH:mm:ss"
                }),
                // Errors will be logged with stack trace
                winston.format.errors({ stack: true }),

                // Add custom Log fields to the log
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                winston.format((info, opts) => {
                    // Info contains an Error property
                    if (info.error && info.error instanceof Error) {
                        info.stack = info.error.stack;
                        info.error = undefined;
                    }

                    info.label = `${info.organization}.${info.context}.${info.app}`;

                    return info;
                })(),
                // Add custom fields to the data property
                winston.format.metadata({
                    key: "data",
                    fillExcept: ["timestamp", "level", "message"]
                }),
                // Format the log as JSON
                winston.format.json()
            ),
            transports: transports,
            exceptionHandlers: transports,
            rejectionHandlers: transports
        };
    }

    public log(level: LogLevel, message: string | Error, data?: LogData, profile?: string) {
        const logData = {
            level: level,
            message: message instanceof Error ? message.message : message,
            error: message instanceof Error ? message : undefined,
            ...data
        };

        if (profile) {
            this.logger.profile(profile, logData);
        } else {
            this.logger.log(logData);
        }
    }

    public debug(message: string, data?: LogData, profile?: string) {
        this.log(LogLevel.Debug, message, data, profile);
    }

    public info(message: string, data?: LogData, profile?: string) {
        this.log(LogLevel.Info, message, data, profile);
    }

    public warn(message: string | Error, data?: LogData, profile?: string) {
        this.log(LogLevel.Warn, message, data, profile);
    }

    public error(message: string | Error, data?: LogData, profile?: string) {
        this.log(LogLevel.Error, message, data, profile);
    }

    public fatal(message: string | Error, data?: LogData, profile?: string) {
        this.log(LogLevel.Fatal, message, data, profile);
    }

    public emergency(message: string | Error, data?: LogData, profile?: string) {
        this.log(LogLevel.Emergency, message, data, profile);
    }

    public startProfile(id: string) {
        this.logger.profile(id);
    }
}

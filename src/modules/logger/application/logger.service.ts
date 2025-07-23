import IContextStorageService, { CONTEXT_STORAGE_SERVICE_KEY } from "@modules/context-storage/interfaces";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { INQUIRER } from "@nestjs/core";
import { ILoggerService, LogData, LOGGER_BASE_KEY, LogLevel } from "../domain";

@Injectable({ scope: Scope.TRANSIENT })
export default class LoggerService implements ILoggerService {
    private sourceClass: string;
    private organization: string;
    private context: string;
    private app: string;

    constructor(
        private readonly configService: ConfigService,

        @Inject(LOGGER_BASE_KEY)
        private readonly logger: ILoggerService,

        @Inject(INQUIRER) parentClass: object,

        @Inject(CONTEXT_STORAGE_SERVICE_KEY)
        private readonly contextStorageService: IContextStorageService
    ) {
        // Set the source class from the parent class
        this.sourceClass = parentClass?.constructor?.name;

        // Set the organization, context and app from the environment variables
        this.organization = this.configService.get<string>("ORGANIZATION");
        this.context = this.configService.get<string>("NODE_ENV");
        this.app = this.configService.get<string>("SERVICE_NAME");
    }

    private getLogData(data?: LogData): LogData {
        return {
            ...data,
            organization: data?.organization || this.organization,
            context: data?.context || this.context,
            app: data?.app || this.app,
            sourceClass: data?.sourceClass || this.sourceClass,
            correlationId: data?.correlationId || this.contextStorageService.getContextId()
        };
    }

    public startProfile(id: string) {
        this.logger.startProfile(id);
    }

    public log(level: LogLevel, message: string | Error, data?: LogData, profile?: string) {
        return this.logger.log(level, message, this.getLogData(data), profile);
    }

    public debug(message: string, data?: LogData, profile?: string) {
        return this.logger.debug(message, this.getLogData(data), profile);
    }

    public info(message: string, data?: LogData, profile?: string) {
        return this.logger.info(message, this.getLogData(data), profile);
    }

    public warn(message: string | Error, data?: LogData, profile?: string) {
        return this.logger.warn(message, this.getLogData(data), profile);
    }

    public error(message: string | Error, data?: LogData, profile?: string) {
        return this.logger.error(message, this.getLogData(data), profile);
    }

    public fatal(message: string | Error, data?: LogData, profile?: string) {
        return this.logger.fatal(message, this.getLogData(data), profile);
    }

    public emergency(message: string | Error, data?: LogData, profile?: string) {
        return this.logger.emergency(message, this.getLogData(data), profile);
    }
}

import { ModuleMetadata } from "@nestjs/common";
import { transports } from "winston";

export type LoggerEngine = "winston" | "pino";

export interface IDynamicLoggerOptions {
    serviceName: string;
    logDir: string;
    level: string;
    customTransports?: LoggerCustomTransport[];
}

export type LoggerCustomTransport = InstanceType<typeof transports.Console> | InstanceType<typeof transports.Http> | any;

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    engine: LoggerEngine;
    isGlobal?: boolean;
    inject?: any[];
    useFactory: (...args: any[]) => Promise<IDynamicLoggerOptions> | IDynamicLoggerOptions;
}

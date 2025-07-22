import { transports } from "winston";

export interface IDynamicLoggerOptions {
    env: string;
    serviceName: string;
    logDir: string;
    level: string;
    customTransports?: LoggerCustomTransport[];
}

export type LoggerCustomTransport = InstanceType<typeof transports.Console> | InstanceType<typeof transports.Http> | any;

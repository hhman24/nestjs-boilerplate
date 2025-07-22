import { WinstonModuleOptions } from "nest-winston";
import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { IDynamicLoggerOptions } from "./interfaces";

export class WinstonFactory {
    createWinstonModuleOptions(options: IDynamicLoggerOptions): WinstonModuleOptions | Promise<WinstonModuleOptions> {
        const { level, logDir, serviceName, customTransports } = options;
        winston.addColors({
            error: "red",
            warning: "yellow",
            info: "green",
            debug: "blue"
        });

        return {
            levels: winston.config.syslog.levels,
            level: level,
            transports: [
                new transports.Console({ format: this.formatLogMessage(serviceName) }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "info",
                    dirname: logDir + "/info",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson(serviceName)
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "error",
                    dirname: logDir + "/error",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson(serviceName)
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "warning",
                    dirname: logDir + "/warning",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson(serviceName)
                }),
                ...customTransports
            ]
        };
    }

    private formatLogMessage(serviceName: string) {
        return format.combine(
            format.label({ label: serviceName }),
            format.timestamp({
                format: () => {
                    const now = new Date();
                    const vietnamTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
                    return vietnamTime.toISOString().replace("T", " ").substring(0, 19); // Format as YYYY-MM-DD HH:mm:ss
                }
            }),
            format.errors({ stack: true }),
            format.printf((info: any) => {
                const timestamp = info.timestamp;
                const level = info.level.toUpperCase();
                const message = info.message;
                const stack = info.stack || info.trace;
                const context = info.context || info.label;

                return `[${context}] [${timestamp}] [${level}] - ${message}${stack ? `\n${stack}` : ""}`;
            }),
            format.colorize({ all: true })
        );
    }

    private formatLogJson(serviceName: string) {
        return format.combine(
            format.label({ label: serviceName }),
            format.timestamp({
                format: () => {
                    const now = new Date();
                    return now.toISOString().replace("T", "").substring(0, 19);
                }
            }),
            format.errors({ stack: true }),
            format.printf((info) => {
                const logObj: Record<string, any> = {
                    service: serviceName,
                    timestamp: info.timestamp,
                    level: info.level,
                    message: info.message
                };

                if (info.stack || info.trace) {
                    logObj.trace = info.stack || info.trace;
                }

                if (info.context) {
                    logObj.context = info.context;
                }

                return JSON.stringify(logObj);
            })
        );
    }
}

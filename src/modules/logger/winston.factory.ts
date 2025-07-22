import { WinstonModuleOptions } from "nest-winston";
import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { LoggerCustomTransport } from "./interfaces";

export class WinstonFactory {
    createWinstonModuleOptions(
        serviceName: string,
        context: string,
        logDir: string,
        level: string,
        customTransports: LoggerCustomTransport[] = []
    ): WinstonModuleOptions | Promise<WinstonModuleOptions> {
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
                    format: this.formatLogJson()
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "error",
                    dirname: logDir + "/error",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson()
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "warning",
                    dirname: logDir + "/warning",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson()
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
                return `[${info.label}] [${info.timestamp}] [${info.level.toUpperCase()}] - ${info.message}`;
            }),
            format.colorize({ all: true })
        );
    }

    private formatLogJson() {
        return format.combine(
            format.label({ label: this.configService.get<string>("SERVICE_NAME") }),
            format.timestamp({
                format: () => {
                    const now = new Date();
                    return now.toISOString().replace("T", "").substring(0, 19);
                }
            }),
            format.errors({ stack: true }),
            format.printf((info) => {
                const logObj: Record<string, any> = {
                    service: this.configService.get<string>("SERVICE_NAME"),
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

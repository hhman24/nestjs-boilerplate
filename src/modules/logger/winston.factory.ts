import { WinstonModuleOptions } from "nest-winston";
import path from "path";
import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { IDynamicLoggerOptions } from "./interfaces";

export class WinstonFactory {
    createWinstonModuleOptions(options: IDynamicLoggerOptions): WinstonModuleOptions {
        const { level, logDir, serviceName, customTransports = [] } = options;
        const logPath = path.join(process.cwd(), logDir);

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
                    dirname: logPath + "/info",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson(serviceName)
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "error",
                    dirname: logPath + "/error",
                    maxFiles: 30,
                    zippedArchive: true,
                    format: this.formatLogJson(serviceName)
                }),
                new DailyRotateFile({
                    filename: "%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    level: "warning",
                    dirname: logPath + "/warning",
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
            format.timestamp({ format: () => new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }) }),
            format.errors({ stack: true }),
            format.printf(({ level, message, context, timestamp, stack, trace }) => {
                const stackLog = stack || trace;
                const pid = process.pid;
                const contextLog = this.color("yellow", (context as string) || "undefined");
                return `[${serviceName}] ${pid} - ${this.color("gray", timestamp as string)} ${level.toUpperCase().padEnd(7)} [${contextLog}] ${message}${stackLog ? `\n${stackLog}` : ""}`;
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

    private color(colorName: string, text: string): string {
        const colors: Record<string, string> = {
            gray: "\x1b[90m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            reset: "\x1b[0m"
        };

        return `${colors[colorName] || ""}${text}${colors.reset}`;
    }
}

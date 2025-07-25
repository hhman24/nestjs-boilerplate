import { LogLevel } from "@modules/logger/domain/log.interface";
import winston from "winston";

enum LogColors {
    red = "\x1b[31m",
    green = "\x1b[32m",
    yellow = "\x1b[33m",
    blue = "\x1b[34m",
    magenta = "\x1b[35m",
    cyan = "\x1b[36m",
    pink = "\x1b[38;5;206m"
}

export default class ConsoleTransport {
    public static createColorize() {
        return new winston.transports.Console({
            format: winston.format.combine(
                winston.format.printf((log) => {
                    const logData: any = log.data;
                    const color = this.mapLogLevelColor(log.level as LogLevel);
                    const prefix = `${logData.label ? `[${logData.label}]` : ""}`;

                    const label = `${this.colorize(color, prefix + ` ${process.pid}` + "  -")} ${log.timestamp}`;
                    const correlationId = logData.correlationId ? ` (${this.colorize(LogColors.cyan, logData.correlationId)})\t` : "";
                    const logLevel = ` ${this.colorize(color, log.level.toUpperCase().padStart(5))} `;
                    const sourceClass = logData.sourceClass ? `${this.colorize(LogColors.cyan, `[${logData.sourceClass}]`)} ` : "";
                    const message = this.colorize(color, `${log.message}`);
                    const error = logData.error ? logData.error : "";
                    const duration = logData.durationMs !== undefined ? this.colorize(color, " +" + logData.durationMs + "ms") : "";
                    const stack = logData.stack ? this.colorize(color, `${logData.stack}`) : "";
                    const props = logData.props ? `\nProps: ${JSON.stringify(logData.props, null, 4)}` : "";

                    return (
                        label +
                        correlationId +
                        logLevel +
                        sourceClass +
                        message +
                        `${duration ? duration : ""}` +
                        `${error ? "\n" + error : ""}` +
                        `${stack ? "\n" + stack : ""}` +
                        props
                    );
                })
            )
        });
    }

    private static colorize(color: LogColors, message: string): string {
        return `${color}${message}\x1b[0m`;
    }

    private static mapLogLevelColor(level: LogLevel): LogColors {
        switch (level) {
            case LogLevel.Debug:
                return LogColors.blue;
            case LogLevel.Info:
                return LogColors.green;
            case LogLevel.Warn:
                return LogColors.yellow;
            case LogLevel.Error:
                return LogColors.red;
            case LogLevel.Fatal:
                return LogColors.magenta;
            case LogLevel.Emergency:
                return LogColors.pink;
            default:
                return LogColors.cyan;
        }
    }
}

import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";

export default class FileTransport {
    public static create(logDir: string) {
        const logPath = path.join(process.cwd(), logDir);

        return new DailyRotateFile({
            dirname: logPath,
            filename: "%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        });
    }
}

import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
    @Inject(LOGGER_KEY)
    private readonly logger: ILoggerService;

    use(request: Request, response: Response, next: () => void) {
        const { method, originalUrl } = request;
        const userAgent = request.headers["user-agent"] || "Unknown";
        const ip = request.ip || request.headers["x-forwarded-for"] || "Unknown";
        const url = originalUrl.split("?")[0];

        this.logger.info(`Request - ${method} ${url} - User-Agent: ${userAgent} - IP: ${ip} `);

        next();
    }
}

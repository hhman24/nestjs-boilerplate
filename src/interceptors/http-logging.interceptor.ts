import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
    constructor(@Inject(LOGGER_KEY) private readonly logger: ILoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();

        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        const { method, originalUrl } = request;
        const ip = request.ip || request.headers["x-forwarded-for"] || "unknown";
        const userAgent = request.headers["user-agent"] || "unknown";
        const protocol = `HTTP/${request.httpVersion}`;
        const contentLength = response.getHeader("content-length") ?? 0;
        const referrer = request.headers["referer"] || "-";

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - startTime;
                const statusCode = response.statusCode;

                this.logger.info(`${method} ${originalUrl} ${protocol} ${statusCode} +${duration}ms - SIZE: ${contentLength} ${referrer} UA: ${userAgent} - IP: ${ip}`);
            })
        );
    }
}

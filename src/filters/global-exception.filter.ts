import { IAppError, ResponseType } from "@common";
import { MessageCodeEnum } from "@enums";
import { RequestTimeOutException, ValidationException } from "@exceptions";
import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ThrottlerException } from "@nestjs/throttler";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        @Inject(LOGGER_KEY) private readonly logger: ILoggerService
    ) {}

    catch(exception: any, host: ArgumentsHost): void {
        const ctxType = host.getType();

        if (ctxType === "http") {
            this.handleHttpContext(exception, host);
        }

        return;
    }

    private handleHttpContext(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const path = httpAdapter.getRequestUrl(request);
        const method = httpAdapter.getRequestMethod(request);

        let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        let responseBody: ResponseType = {
            code: MessageCodeEnum.INTERNAL_SERVER_ERROR,
            message: "An unexpected error occurred. Please try again later.",
            data: null
        };

        if (exception instanceof ValidationException) {
            httpStatus = exception.getStatus();
            responseBody = this.handleValidationException(exception, path, method);
        } else if (exception instanceof RequestTimeOutException) {
            httpStatus = exception.getStatus();
            responseBody = this.handleRequestTimeOutException(exception, path, method);
        } else if (exception instanceof NotFoundException) {
            httpStatus = exception.getStatus();
            responseBody = this.handleNotFoundException(exception, path, method);
        } else if (exception instanceof ThrottlerException) {
            httpStatus = exception.getStatus();
            responseBody = this.handleThrottlerException(exception);
        } else {
            responseBody = this.handleUnexpectedError(exception, path, method);
        }

        // Respond to client
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    private handleNotFoundException(exception: RequestTimeOutException, path: string, method: string): ResponseType {
        const errorData = exception.getResponse() as IAppError;

        this.logger.warn(`${errorData.message}`, {
            sourceClass: GlobalExceptionFilter.name,
            props: { method, path }
        });

        // alert prometheus

        return {
            code: MessageCodeEnum.NOT_FOUND,
            data: null,
            message: this.extractMessage(exception, errorData.message)
        };
    }

    private handleRequestTimeOutException(exception: RequestTimeOutException, path: string, method: string): ResponseType {
        const errorData = exception.getResponse() as IAppError;

        this.logger.fatal(`${errorData.message} - [${method} ${path}]`, {
            sourceClass: GlobalExceptionFilter.name,
            error: errorData?.error ?? undefined,
            props: { method, path }
        });

        // alert prometheus

        return {
            code: errorData.code,
            data: null,
            message: this.extractMessage(exception, errorData.message)
        };
    }

    private handleThrottlerException(exception: ThrottlerException): ResponseType {
        const errorData = exception.getResponse();

        this.logger.warn(`${errorData}`, {
            sourceClass: GlobalExceptionFilter.name
        });

        return {
            code: MessageCodeEnum.T0O_MANY_REQUESTS,
            data: null,
            message: "Too many request"
        };
    }

    private handleValidationException(exception: ValidationException, path: string, method: string): ResponseType {
        const errorData = exception.getResponse() as IAppError;

        this.logger.warn(`${errorData.message} - [${method} ${path}]`, {
            sourceClass: GlobalExceptionFilter.name,
            error: errorData?.error ?? undefined,
            props: { method, path }
        });

        return {
            code: errorData.code,
            data: null,
            message: this.extractMessage(exception, errorData.message)
        };
    }

    private handleUnexpectedError(exception: any, path: string, method: string) {
        // Normalize message extraction
        this.logger.error(`${exception?.message} - [${method} ${path}]`, {
            error: exception,
            sourceClass: GlobalExceptionFilter.name
        });

        // Standardized error response
        return {
            code: MessageCodeEnum.INTERNAL_SERVER_ERROR,
            data: null,
            message: exception?.message ?? "An unexpected error occurred"
        };
    }

    private extractMessage(exception: any, response: any): string {
        if (response) {
            if (typeof response === "string") return response;
            if (Array.isArray(response.message)) return response.message.join(", ");
            if (typeof response.message === "string") return response.message;
        }

        return exception.message || "An unexpected error occurred";
    }
}

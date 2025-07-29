import { IAppError, IResponseType } from "@common";
import { MessageCodeEnum } from "@enums";
import { RequestTimeOutException, ResourceNotFoundException, ValidationException } from "@exceptions";
import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { ThrottlerException } from "@nestjs/throttler";
import { QueryFailedError } from "typeorm";
import { constraintErrors } from "./constraint-error";

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

        let responseBody: IResponseType = {
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
        } else if (exception instanceof QueryFailedError) {
            responseBody = this.handleQueryFailedError(exception, path, method);
        } else if (exception instanceof ResourceNotFoundException) {
            httpStatus = exception.getStatus();
            responseBody = this.handleResourceNotFoundException(exception, path, method);
        } else {
            responseBody = this.handleUnexpectedError(exception, path, method);
        }

        // Respond to client
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    private handleResourceNotFoundException(exception: ResourceNotFoundException, path: string, method: string): IResponseType {
        const r = exception.getResponse() as IAppError;

        this.logger.error(`${r.message}`, {
            sourceClass: GlobalExceptionFilter.name,
            props: { method, path, ...r.meta }
        });

        return {
            code: MessageCodeEnum.NOT_FOUND,
            data: null,
            message: r.message
        };
    }

    private handleQueryFailedError(exception: QueryFailedError, path: string, method: string): IResponseType {
        const r = exception as QueryFailedError & { constraint?: string };
        const code = r.constraint?.startsWith("UQ") ? MessageCodeEnum.CONFLICT : MessageCodeEnum.INTERNAL_SERVER_ERROR;
        const message = r.constraint?.startsWith("UQ") ? constraintErrors[r.constraint] || r.constraint : "common.error.internal_server_error";

        this.logger.error(`${r.query} - ${r.message}`, {
            sourceClass: GlobalExceptionFilter.name,
            props: { method, path },
            error: r
        });

        return {
            code: code,
            data: null,
            message: this.extractMessage(exception, message)
        };
    }

    private handleNotFoundException(exception: RequestTimeOutException, path: string, method: string): IResponseType {
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

    private handleRequestTimeOutException(exception: RequestTimeOutException, path: string, method: string): IResponseType {
        const errorData = exception.getResponse() as IAppError;

        this.logger.fatal(`${errorData.message}`, {
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

    private handleThrottlerException(exception: ThrottlerException): IResponseType {
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

    private handleValidationException(exception: ValidationException, path: string, method: string): IResponseType {
        const errorData = exception.getResponse() as IAppError;

        this.logger.warn(`${errorData.message}`, {
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

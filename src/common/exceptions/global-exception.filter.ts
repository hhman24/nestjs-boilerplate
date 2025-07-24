import { ResponseCodeEnum } from "@common/enums";
import { ResponseType } from "@common/types";
import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

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
    }

    private handleHttpContext(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const genericMessage = "An unexpected error occurred. Please try again later.";
        const isHttpException = exception instanceof HttpException;

        const httpStatus = exception.getStatus();
        const message = isHttpException ? exception.getResponse() : exception.message;

        // Normalize message extraction
        const extractedMessage = this.extractMessage(exception, message);
        const messageResponse = httpStatus === HttpStatus.INTERNAL_SERVER_ERROR ? genericMessage : extractedMessage;

        if (!isHttpException) {
            const path = httpAdapter.getRequestUrl(ctx.getRequest());
            const method = httpAdapter.getRequestMethod(ctx.getRequest());

            // Unexpected error
            this.logger.fatal(`${message} - [${method} ${path}]`, {
                context: "unexpected",
                error: exception.cause?.error ?? new Error(message),
                sourceClass: GlobalExceptionFilter.name
            });
        }

        // Standardized error response
        const responseBody: ResponseType = {
            code: exception.cause?.code ?? ResponseCodeEnum.INTERNAL_SERVER_ERROR,
            data: null,
            message: messageResponse
        };

        // Respond to client
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
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

import { ConfigKeyEnum, ResponseCodeEnum } from "@common/enums";
import { IAppConfig } from "@common/interfaces";
import { ILoggerService, LOGGER_KEY } from "@modules/logger/domain";
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable, TimeoutError, catchError, throwError, timeout } from "rxjs";

@Injectable()
export class RequestTimeoutInterceptor implements NestInterceptor {
    constructor(
        private readonly configService: ConfigService,
        @Inject(LOGGER_KEY) private readonly logger: ILoggerService
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const appConfig = this.configService.get<IAppConfig>(`${ConfigKeyEnum.APP}`);

        return next.handle().pipe(
            timeout(appConfig.apiTimeout), // Correct placement of timeout
            catchError((err) => {
                const req = context.switchToHttp().getRequest();
                const correlationId = req.headers["x-correlation-id"] as string;

                this.logger.error(
                    "request timeout",
                    {
                        props: {
                            method: req.method,
                            path: req.url,
                            ip: req.ip
                        }
                    },
                    `${correlationId}`
                );

                if (err instanceof TimeoutError) {
                    return throwError(
                        () =>
                            new HttpException("request timeout!!", HttpStatus.REQUEST_TIMEOUT, {
                                cause: {
                                    code: ResponseCodeEnum.REQUEST_TIMEOUT,
                                    error: err
                                }
                            })
                    );
                }

                return throwError(() => err);
            })
        ); // Ensure all operators are inside pipe()
    }
}

import { IAppConfig } from "@common";
import { ConfigKeyEnum, MessageCodeEnum } from "@enums";
import { RequestTimeOutException } from "@exceptions";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable, TimeoutError, catchError, throwError, timeout } from "rxjs";

@Injectable()
export class RequestTimeoutInterceptor implements NestInterceptor {
    constructor(private readonly configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const appConfig = this.configService.get<IAppConfig>(`${ConfigKeyEnum.APP}`);

        return next.handle().pipe(
            timeout(appConfig.apiTimeout), // Correct placement of timeout
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeOutException({ message: "Request timeout. try later!!", code: MessageCodeEnum.REQUEST_TIMEOUT }));
                }

                return throwError(() => err);
            })
        ); // Ensure all operators are inside pipe()
    }
}

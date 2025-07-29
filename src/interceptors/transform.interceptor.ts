import { IResponseType } from "@common";
import { MessageCodeEnum } from "@enums";
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponseType<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<IResponseType<T>> | Promise<Observable<IResponseType<T>>> {
        const response = context.switchToHttp().getResponse();

        if (response.statusCode === HttpStatus.FOUND) {
            // is redirect route
            return next.handle();
        }

        return next.handle().pipe(
            map((data) => {
                const result = {
                    message: data?.message ?? null,
                    code: data?.code ?? MessageCodeEnum.SUCCESS,
                    data: data?.data ?? null
                };

                return result;
            })
        );
    }
}

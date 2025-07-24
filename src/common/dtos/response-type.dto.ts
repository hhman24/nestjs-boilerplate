import { ResponseCodeEnum } from "@enums";
import { ApiResponseProperty } from "@nestjs/swagger";

export class ResponseTypeDto<T = any> {
    @ApiResponseProperty({ example: ResponseCodeEnum.SUCCESS })
    code?: number;

    @ApiResponseProperty({ example: "sucess" })
    message?: string;

    @ApiResponseProperty()
    data?: T;
}

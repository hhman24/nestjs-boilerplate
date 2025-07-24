import { MessageCodeEnum } from "@enums";
import { ApiResponseProperty } from "@nestjs/swagger";

export class ResponseTypeDto<T = any> {
    @ApiResponseProperty({ example: MessageCodeEnum.SUCCESS })
    code?: number;

    @ApiResponseProperty({ example: "sucess" })
    message?: string;

    @ApiResponseProperty()
    data?: T;
}
